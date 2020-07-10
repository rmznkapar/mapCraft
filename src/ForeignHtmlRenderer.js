/* eslint-disable no-async-promise-executor */
/**
 *
 * @param {StyleSheetList} styleSheets
 */
export function ForeignHtmlRenderer (styleSheets) {
  const self = this

  /**
     *
     * @param {String} contentHtml
     * @param {Number} width
     * @param {Number} height
     *
     * @returns {Promise<String>}
     */
  const buildSvgDataUri = async function (contentHtml, width, height) {
    return new Promise(async function (resolve, reject) {
      // build SVG string
      const svg = contentHtml

      // convert SVG to data-uri
      const dataUri = `data:image/svg+xml;base64,${window.btoa(svg)}`

      resolve(dataUri)
    })
  }

  /**
     * @param {String} html
     * @param {Number} width
     * @param {Number} height
     *
     * @return {Promise<Image>}
     */
  this.renderToImage = async function (html, width, height) {
    return new Promise(async function (resolve, reject) {
      const img = new Image()
      img.src = await buildSvgDataUri(html, width, height)

      img.onload = function () {
        resolve(img)
      }
    })
  }

  /**
     * @param {String} html
     * @param {Number} width
     * @param {Number} height
     *
     * @return {Promise<Image>}
     */
  this.renderToCanvas = async function (html, width, height) {
    return new Promise(async function (resolve, reject) {
      const img = await self.renderToImage(html, width, height)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const canvasCtx = canvas.getContext('2d')
      canvasCtx.drawImage(img, 0, 0, img.width, img.height)

      resolve(canvas)
    })
  }

  /**
     * @param {String} html
     * @param {Number} width
     * @param {Number} height
     *
     * @return {Promise<String>}
     */
  this.renderToBase64Png = async function (html, width, height) {
    return new Promise(async function (resolve, reject) {
      const canvas = await self.renderToCanvas(html, width, height)
      resolve(canvas.toDataURL('image/png'))
    })
  }
}
