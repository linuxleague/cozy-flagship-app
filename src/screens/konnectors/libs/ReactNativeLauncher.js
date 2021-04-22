import ContentScriptBridge from './bridge/ContentScriptBridge'
import MicroEE from 'microee'

/**
 * All launchers are supposed to implement this interface
 *
 * @interface
 */
class LauncherInterface {
  /**
   * Inject the content script and initialize the bridge to communicate it
   *
   * @param  {Object} options.bridgeOptions : options which will be given as is to the bridge. Bridge options depend on the environment of the launcher
   * @param  {String} options.contentScript : source code of the content script which will be injected
   *
   * @return {Bridge}
   */
  async init({bridgeOptions, contentScript}) {}

  /**
   * Start the connector execution
   *
   * @param  {LauncherRunContext} options.context : current cozy context of the connector
   *
   * @return {Bridge}
   */
  async start({context}) {}

  /**
   * Get content script logs. This function is called by the content script via the bridge
   *
   * @param  {ContentScriptLogMessage} message : log message
   */
  log(message) {}
}

/**
 * This is the launcher implementation for a React native application
 */
class ReactNativeLauncher extends LauncherInterface {
  constructor() {
    super()
    this.workerListenedEvents = ['log', 'workerEvent']
  }
  async init({bridgeOptions, contentScript}) {
    console.time('bridges init')
    const promises = [
      this.initContentScriptBridge({
        bridgeName: 'pilotWebviewBridge',
        webViewRef: bridgeOptions.pilotWebView,
        contentScript,
        exposedMethodsNames: ['setWorkerState'],
        listenedEvents: ['log'],
      }),
      this.initContentScriptBridge({
        bridgeName: 'workerWebviewBridge',
        webViewRef: bridgeOptions.workerWebview,
        contentScript,
        exposedMethodsNames: [],
        listenedEvents: this.workerListenedEvents,
      }),
    ]
    await Promise.all(promises)
    console.timeEnd('bridges init')
  }
  async start({context}) {
    await this.pilotWebviewBridge.call('ensureAuthenticated')
    // TODO
    // * need the cozy url + token
    // * get remote context if launcher has a destination folder + get all the documents in doctypes
    // declared in the manifest and created by the given account (or sourceAccountIdentifier ?
    // TODO update the job result when the job is finished
  }

  /**
   * Makes the launcherView display the worker webview
   *
   * @param {String} url : url displayed by the worker webview for the login
   */
  async setWorkerState(options) {
    this.emit('SET_WORKER_STATE', options)
  }

  /**
   * Reestablish the connection between launcher and the worker after a web page reload
   */
  async restartWorkerConnection(event) {
    console.log('restarting worker', event)

    try {
      await this.workerWebviewBridge.init()
      for (const eventName of this.workerListenedEvents) {
        this.workerWebviewBridge.addEventListener(
          eventName,
          this[eventName].bind(this),
        )
      }
    } catch (err) {
      throw new Error(`worker bridge restart init error: ${err.message}`)
    }
    console.log('webworker bridge connection restarted')
  }

  /**
   * This method creates and init a content script bridge to the launcher with some facilities to make
   * it's own method callable by the content script
   *
   * @param {String} options.bridgeName : Name of the attribute where the bridge instance will be placed
   * @param {WebView} options.webViewRef : WebView object to link to the launcher thanks to the bridge
   * @param {Array.<String>} options.exposedMethodsNames : list of methods of the launcher to expose to the content script
   * @param {Array.<String>} options.listenedEvents : list of methods of the launcher to link to content script emitted events
   * @returns {ContentScriptBridge}
   */
  async initContentScriptBridge({
    bridgeName,
    webViewRef,
    exposedMethodsNames,
    listenedEvents,
  }) {
    const webviewBridge = new ContentScriptBridge({webViewRef})
    const exposedMethods = {}
    for (const method of exposedMethodsNames) {
      exposedMethods[method] = this[method].bind(this)
    }
    // the bridge must be exposed before the call to the webviewBridge.init function or else the init sequence won't work
    // since the init sequence needs an already working bridge
    this[bridgeName] = webviewBridge
    try {
      await webviewBridge.init({exposedMethods})
    } catch (err) {
      throw new Error(`Init error ${bridgeName}: ${err.message}`)
    }
    for (const event of listenedEvents) {
      webviewBridge.addEventListener(event, this[event].bind(this))
    }
    return webviewBridge
  }

  /**
   * log messages emitted from the worker and the pilot
   *
   * @param {String} message
   */
  log(message) {
    console.log('contentscript: ', message)
  }

  /**
   * Relays events from the worker to the pilot
   *
   * @param {Object} event
   */
  workerEvent(event) {
    this.pilotWebviewBridge.emit('workerEvent', event)
  }

  /**
   * Relay between the pilot webview and the bridge to allow the bridge to work
   */
  onPilotMessage(event) {
    if (this.pilotWebviewBridge) {
      const messenger = this.pilotWebviewBridge.messenger
      messenger.onMessage.bind(messenger)(event)
    }
  }

  /**
   * Relay between the worker webview and the bridge to allow the bridge to work
   */
  onWorkerMessage(event) {
    if (this.workerWebviewBridge) {
      const messenger = this.workerWebviewBridge.messenger
      messenger.onMessage.bind(messenger)(event)
    }
  }

  /**
   * Actions to do before the worker reloads : restart the connection
   */
  onWorkerWillReload(event) {
    this.restartWorkerConnection(event)
    return true // allows the webview to load the new page
  }
}

/**
 * @typedef LauncherRunContext
 * @property {Object} konnector : connector manifest
 * @property {io.cozy.accounts} : account
 * @property {io.cozy.triggers} : trigger
 * @property {io.cozy.jobs}     : job
 */

/**
 * @typedef ContentScriptLogMessage
 * @property {string} level            : ( debug | info | warning | error | critical). Log level
 * @property {any} message             : message content
 * @property {string | null} label     : user defined label
 * @property {string | null} namespace : user defined namespace
 */

MicroEE.mixin(ReactNativeLauncher)
export default ReactNativeLauncher
