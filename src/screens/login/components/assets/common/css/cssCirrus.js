/****************************************************************/
/* This code should reflect cozy-stack/assets/styles/cirrus.css */
/*                                                              */
/* Used SVG image should be converted to base 64 using          */
/* https://base64.guru/converter/decode/image/svg               */
/****************************************************************/

export const cirrusCss = `
/* Buttons */
.btn .icon {
  vertical-align: middle;
}
.btn-done {
  background-color: var(--successColorLightest) !important;
  opacity: 1 !important;
  transition: none;
}

/* Icons */
.icon-alert {
  -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBhOCA4IDAgMSAxIDAgMTZBOCA4IDAgMCAxIDggMHptMCA5Ljc1YTEuMjUgMS4yNSAwIDEgMCAwIDIuNSAxLjI1IDEuMjUgMCAwIDAgMC0yLjV6TTggNGExIDEgMCAwIDAtLjk5My44ODNMNyA1djNhMSAxIDAgMCAwIDEuOTkzLjExN0w5IDhWNWExIDEgMCAwIDAtMS0xeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==');
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBhOCA4IDAgMSAxIDAgMTZBOCA4IDAgMCAxIDggMHptMCA5Ljc1YTEuMjUgMS4yNSAwIDEgMCAwIDIuNSAxLjI1IDEuMjUgMCAwIDAgMC0yLjV6TTggNGExIDEgMCAwIDAtLjk5My44ODNMNyA1djNhMSAxIDAgMCAwIDEuOTkzLjExN0w5IDhWNWExIDEgMCAwIDAtMS0xeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==');
}
.icon-answer {
  -webkit-mask: url(../icons/answer.svg) space no-repeat bottom;
  mask: url(../icons/answer.svg) space no-repeat bottom;
  width: 0.813rem;
}
.icon-auth {
  -webkit-mask-image: url(../icons/auth.svg);
  mask-image: url(../icons/auth.svg);
}
.icon-back {
  -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTMuNDE0IDdoMTEuNThDMTUuNTQ4IDcgMTYgNy40NDQgMTYgOGMwIC41NTItLjQ1IDEtMS4wMDcgMUgzLjQxNGw1LjI5MyA1LjI5M2ExIDEgMCAwIDEtMS40MTQgMS40MTRsLTctN2ExIDEgMCAwIDEgMC0xLjQxNGw3LTdhMSAxIDAgMCAxIDEuNDE0IDEuNDE0TDMuNDE0IDd6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=');
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZD0iTTMuNDE0IDdoMTEuNThDMTUuNTQ4IDcgMTYgNy40NDQgMTYgOGMwIC41NTItLjQ1IDEtMS4wMDcgMUgzLjQxNGw1LjI5MyA1LjI5M2ExIDEgMCAwIDEtMS40MTQgMS40MTRsLTctN2ExIDEgMCAwIDEgMC0xLjQxNGw3LTdhMSAxIDAgMCAxIDEuNDE0IDEuNDE0TDMuNDE0IDd6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=');
}
.icon-check {
  -webkit-mask-image: url(../icons/check.svg);
  mask-image: url(../icons/check.svg);
}
.icon-check-circle {
  -webkit-mask-image: url(../icons/check-circle.svg);
  mask-image: url(../icons/check-circle.svg);
}
.icon-cross {
  -webkit-mask-image: url(../icons/cross.svg);
  mask-image: url(../icons/cross.svg);
}
.icon-eye-closed {
  -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDEyLjAzOGMuNTg3IDAgMS4xNDEtLjEzNCAxLjY0NC0uMzYxbC0xLjY0LTEuNjM5SDhhMiAyIDAgMCAxLTItMnYtLjAwNEw0LjM2MSA2LjM5NUEzLjk3NSAzLjk3NSAwIDAgMCA0IDguMDM4YTQgNCAwIDAgMCA0IDR6TTEuMTE1IDEuMmwxMi43MjcgMTIuNzA1LS45ODYuOTg2LTEuNTYtMS41NjJBNy43OTYgNy43OTYgMCAwIDEgOCAxNC4wMzhjLTYgMC04LTYtOC02cy42NjItMS45NjkgMi4zNTMtMy42NTJMLjE0MSAyLjE3NWwuOTc0LS45NzV6bTUuMTk2IDMuMjI1LTEuNjYtMS42NkE3Ljc4MiA3Ljc4MiAwIDAgMSA4IDIuMDM5YzYgMCA4IDYgOCA2cy0uNjcxIDEuOTk3LTIuMzkgMy42ODdsLTEuOTk2LTEuOTk3YTMuOTY5IDMuOTY5IDAgMCAwIC4zODUtMS42OSA0IDQgMCAwIDAtNC00Yy0uNjA1IDAtMS4xNzMuMTQ1LTEuNjg4LjM4N3pNOCA2LjAzOGEyIDIgMCAwIDEgMiAyYzAgLjAyNC0uMDA2LjA0Ni0uMDA3LjA2OUw3LjkzMSA2LjA0NWMuMDIzLS4wMDEuMDQ2LS4wMDcuMDY5LS4wMDd6IiBmaWxsPSIjMUQyMTJBIiBmaWxsLW9wYWNpdHk9Ii45Ii8+PC9zdmc+');
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDEyLjAzOGMuNTg3IDAgMS4xNDEtLjEzNCAxLjY0NC0uMzYxbC0xLjY0LTEuNjM5SDhhMiAyIDAgMCAxLTItMnYtLjAwNEw0LjM2MSA2LjM5NUEzLjk3NSAzLjk3NSAwIDAgMCA0IDguMDM4YTQgNCAwIDAgMCA0IDR6TTEuMTE1IDEuMmwxMi43MjcgMTIuNzA1LS45ODYuOTg2LTEuNTYtMS41NjJBNy43OTYgNy43OTYgMCAwIDEgOCAxNC4wMzhjLTYgMC04LTYtOC02cy42NjItMS45NjkgMi4zNTMtMy42NTJMLjE0MSAyLjE3NWwuOTc0LS45NzV6bTUuMTk2IDMuMjI1LTEuNjYtMS42NkE3Ljc4MiA3Ljc4MiAwIDAgMSA4IDIuMDM5YzYgMCA4IDYgOCA2cy0uNjcxIDEuOTk3LTIuMzkgMy42ODdsLTEuOTk2LTEuOTk3YTMuOTY5IDMuOTY5IDAgMCAwIC4zODUtMS42OSA0IDQgMCAwIDAtNC00Yy0uNjA1IDAtMS4xNzMuMTQ1LTEuNjg4LjM4N3pNOCA2LjAzOGEyIDIgMCAwIDEgMiAyYzAgLjAyNC0uMDA2LjA0Ni0uMDA3LjA2OUw3LjkzMSA2LjA0NWMuMDIzLS4wMDEuMDQ2LS4wMDcuMDY5LS4wMDd6IiBmaWxsPSIjMUQyMTJBIiBmaWxsLW9wYWNpdHk9Ii45Ii8+PC9zdmc+');
}
.icon-eye-opened {
  -webkit-mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDJjMy42MzcgMCA2Ljc0MiAyLjQ4OCA4IDYtMS4yNTggMy41MTItNC4zNjMgNi04IDYtMy42MzcgMC02Ljc0Mi0yLjQ4OC04LTYgMS4yNTgtMy41MTIgNC4zNjMtNiA4LTZ6bTAgMTBhNCA0IDAgMSAwIDAtOCA0IDQgMCAwIDAgMCA4em0wLTZhMiAyIDAgMSAxLS4wMDEgNC4wMDFBMiAyIDAgMCAxIDggNnoiIGZpbGw9IiMxRDIxMkEiIGZpbGwtb3BhY2l0eT0iLjkiLz48L3N2Zz4=');
  mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDJjMy42MzcgMCA2Ljc0MiAyLjQ4OCA4IDYtMS4yNTggMy41MTItNC4zNjMgNi04IDYtMy42MzcgMC02Ljc0Mi0yLjQ4OC04LTYgMS4yNTgtMy41MTIgNC4zNjMtNiA4LTZ6bTAgMTBhNCA0IDAgMSAwIDAtOCA0IDQgMCAwIDAgMCA4em0wLTZhMiAyIDAgMSAxLS4wMDEgNC4wMDFBMiAyIDAgMCAxIDggNnoiIGZpbGw9IiMxRDIxMkEiIGZpbGwtb3BhY2l0eT0iLjkiLz48L3N2Zz4=');
}
.icon-import {
  -webkit-mask-image: url(../icons/import.svg);
  mask-image: url(../icons/import.svg);
}
.icon-info {
  -webkit-mask-image: url(../icons/info.svg);
  mask-image: url(../icons/info.svg);
}
.icon-permissions {
  -webkit-mask-image: url(../icons/permissions.svg);
  mask-image: url(../icons/permissions.svg);
}
.icon-right {
  -webkit-mask-image: url(../icons/arrow-right.svg);
  mask-image: url(../icons/arrow-right.svg);
}

/* Icons for files on the authorize sharing page */
.filetype {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
}
.filetype-other {
  background-image: url("../images/icon-files.svg");
}
.filetype-audio {
  background-image: url("../images/filetypes/audio.svg");
}
.filetype-bin {
  background-image: url("../images/filetypes/bin.svg");
}
.filetype-code {
  background-image: url("../images/filetypes/code.svg");
}
.filetype-files {
  background-image: url("../images/filetypes/files.svg");
}
.filetype-image {
  background-image: url("../images/filetypes/image.svg");
}
.filetype-note {
  background-image: url("../images/filetypes/note.svg");
}
.filetype-pdf {
  background-image: url("../images/filetypes/pdf.svg");
}
.filetype-sheet {
  background-image: url("../images/filetypes/sheet.svg");
}
.filetype-slide {
  background-image: url("../images/filetypes/slide.svg");
}
.filetype-text {
  background-image: url("../images/filetypes/text.svg");
}
.filetype-video {
  background-image: url("../images/filetypes/video.svg");
}
.filetype-zip {
  background-image: url("../images/filetypes/zip.svg");
}
.filetype-organization {
  background-image: url("../icons/doctypes/organization.svg");
  background-size: contain;
  background-repeat: no-repeat;
}

/* Password strength on onboarding and password renew */
.progress {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 0.3rem;
  bottom: 0.3rem;
  left: 1px;
  background: var(--dividerColor);
  border-top: 0;
  border-radius: 0 0 0.2rem 0.2rem;
}
.progress-bar {
  background: var(--infoColor);
  border-radius: 0 0 0.2rem 0;
}
.progress-bar.w-100 {
  border-radius: 0 0 0.2rem 0.2rem;
}
.progress-bar.pass-weak {
  background: var(--errorColorLightest);
}
.progress-bar.pass-moderate {
  background: var(--warningColorLightest);
}
.progress-bar.pass-strong {
  background: var(--successColorLightest);
}
.w-0 {
  width: 0%;
}
.w-4 {
  width: 4%;
}
.w-8 {
  width: 8%;
}
.w-12 {
  width: 12%;
}
.w-16 {
  width: 16%;
}
.w-20 {
  width: 20%;
}
.w-24 {
  width: 24%;
}
.w-28 {
  width: 28%;
}
.w-32 {
  width: 32%;
}
.w-36 {
  width: 36%;
}
.w-40 {
  width: 40%;
}
.w-44 {
  width: 44%;
}
.w-48 {
  width: 48%;
}
.w-52 {
  width: 52%;
}
.w-56 {
  width: 56%;
}
.w-60 {
  width: 60%;
}
.w-64 {
  width: 64%;
}
.w-68 {
  width: 68%;
}
.w-72 {
  width: 72%;
}
.w-76 {
  width: 76%;
}
.w-80 {
  width: 80%;
}
.w-84 {
  width: 84%;
}
.w-88 {
  width: 88%;
}
.w-92 {
  width: 92%;
}
.w-96 {
  width: 96%;
}

/* Permissions list on the OAuth authorize page */
.authorize-pill {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem 0.75rem;
}
.permissions-list {
  padding: 0;
  list-style: none;
}
.permissions-list li {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.permissions-list li .small {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 1rem 1rem 1rem 0;
}
.permissions-list li + li .small {
  border-top: solid 1px var(--dividerColor);
}
.permissions-list li .halo-icon {
  margin-left: 1rem;
  margin-right: 1rem;
}
@media (min-width: 768px) {
  .permissions-list li .rounded-circle {
    margin-left: 4rem;
  }
}
.permissions-list li .perm {
  -webkit-mask-position: center;
  -webkit-mask-size: 1rem;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 1rem;
  mask-repeat: no-repeat;
}
.perm {
  -webkit-mask-image: url("../icons/doctypes/fallback.svg");
  mask-image: url("../icons/doctypes/fallback.svg");
}
.perm[class^="\\* "] {
  -webkit-mask-image: url("../icons/doctypes/cozy-smile.svg");
  mask-image: url("../icons/doctypes/cozy-smile.svg");
}
.perm[class^="com-bitwarden-ciphers"],
.perm[class^="com-bitwarden-folders"],
.perm[class^="com-bitwarden-profiles"],
.perm[class^="io-cozy-permissions"] {
  -webkit-mask-image: url("../icons/doctypes/lock.svg");
  mask-image: url("../icons/doctypes/lock.svg");
}
.perm[class^="com-bitwarden-organizations"] {
  -webkit-mask-image: url("../icons/doctypes/organization.svg");
  mask-image: url("../icons/doctypes/organization.svg");
}
.perm[class^="cc-cozycloud-dacc"] {
  -webkit-mask-image: url("../icons/doctypes/stats.svg");
  mask-image: url("../icons/doctypes/stats.svg");
}
.perm[class^="io-cozy-settings"],
.perm[class^="io-cozy-bank-settings"] {
  -webkit-mask-image: url("../icons/doctypes/cog.svg");
  mask-image: url("../icons/doctypes/cog.svg");
}
.perm[class^="io-cozy-accounts"],
.perm[class^="io-cozy-accounts-stats"] {
  -webkit-mask-image: url("../icons/doctypes/shield.svg");
  mask-image: url("../icons/doctypes/shield.svg");
}
.perm[class^="io-cozy-apps"],
.perm[class^="io-cozy-apps-suggestions"] {
  -webkit-mask-image: url("../icons/doctypes/grid.svg");
  mask-image: url("../icons/doctypes/grid.svg");
}
.perm[class^="io-cozy-bank-accounts"] {
  -webkit-mask-image: url("../icons/doctypes/wallet.svg");
  mask-image: url("../icons/doctypes/wallet.svg");
}
.perm[class^="io-cozy-bank-groups"] {
  -webkit-mask-image: url("../icons/doctypes/banking.svg");
  mask-image: url("../icons/doctypes/banking.svg");
}
.perm[class^="io-cozy-bank-operations"] {
  -webkit-mask-image: url("../icons/doctypes/euro.svg");
  mask-image: url("../icons/doctypes/euro.svg");
}
.perm[class^="io-cozy-contacts"],
.perm[class^="io-cozy-identities"],
.perm[class^="io-cozy-bank-recipients"] {
  -webkit-mask-image: url("../icons/doctypes/profile.svg");
  mask-image: url("../icons/doctypes/profile.svg");
}
.perm[class^="io-cozy-contacts-groups"] {
  -webkit-mask-image: url("../icons/doctypes/team.svg");
  mask-image: url("../icons/doctypes/team.svg");
}
.perm[class^="io-cozy-bank-recurrence"] {
  -webkit-mask-image: url("../icons/doctypes/timer.svg");
  mask-image: url("../icons/doctypes/timer.svg");
}
.perm[class^="io-cozy-bills"] {
  -webkit-mask-image: url("../icons/doctypes/bill.svg");
  mask-image: url("../icons/doctypes/bill.svg");
}
.perm[class^="cc-cozycloud-sentry"],
.perm[class^="io-cozy-files"] {
  -webkit-mask-image: url("../icons/doctypes/file.svg");
  mask-image: url("../icons/doctypes/file.svg");
}
.perm[class^="io-cozy-files-versions"] {
  -webkit-mask-image: url("../icons/doctypes/history.svg");
  mask-image: url("../icons/doctypes/history.svg");
}
.perm[class^="io-cozy-certified-carbon_copy"] {
  -webkit-mask-image: url("../images/icon-certified.svg");
  mask-image: url("../images/icon-certified.svg");
}
.perm[class^="io-cozy-certified-electronic_safe"] {
  -webkit-mask-image: url("../images/icon-safe.svg");
  mask-image: url("../images/icon-safe.svg");
}
.perm[class^="io-cozy-konnectors"] {
  -webkit-mask-image: url("../icons/doctypes/sync-cozy.svg");
  mask-image: url("../icons/doctypes/sync-cozy.svg");
}
.perm[class^="io-cozy-notifications"] {
  -webkit-mask-image: url("../icons/doctypes/bell.svg");
  mask-image: url("../icons/doctypes/bell.svg");
}
.perm[class^="io-cozy-photos-albums"] {
  -webkit-mask-image: url("../icons/doctypes/picture.svg");
  mask-image: url("../icons/doctypes/picture.svg");
}
.perm[class^="io-cozy-timeseries-geojson"] {
  -webkit-mask-image: url("../icons/doctypes/location.svg");
  mask-image: url("../icons/doctypes/location.svg");
}
.perm[class^="io-cozy-jobs"] {
  -webkit-mask-image: url("../icons/doctypes/email.svg");
  mask-image: url("../icons/doctypes/email.svg");
}
.perm[class^="io-cozy-triggers"] {
  -webkit-mask-image: url("../icons/doctypes/clock.svg");
  mask-image: url("../icons/doctypes/clock.svg");
}
.perm[class^="io-cozy-sharings"] {
  -webkit-mask-image: url("../icons/doctypes/share.svg");
  mask-image: url("../icons/doctypes/share.svg");
}
.perm[class^="io-cozy-oauth-clients"] {
  -webkit-mask-image: url("../icons/doctypes/devices.svg");
  mask-image: url("../icons/doctypes/devices.svg");
}

/* Others */
.halo-icon {
  flex: 2rem 0 0;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  background-color: var(--primaryColor);
  border-radius: 50%;
}
.halo-icon .icon {
  background-color: var(--primaryTextContrastColor);
}
button.alert-info:hover {
  background-color: var(--btn-ghost-hover-color);
}
button.card-intent:hover {
  background-color: var(--errorColorLightest);
}
.big.illustration {
  height: 8rem;
}
.greyed-extension {
  opacity: 0.6;
}
.compat .vertical-separator {
  height: 2rem;
}
.expand {
  display: inline-flex;
}
.expand .icon {
  transition: transform 0.2s;
}
.expanded .icon {
  transform: rotate(90deg);
}
:not(.expanded) + .collapse {
  display: none;
}
`
