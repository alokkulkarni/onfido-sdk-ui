// @flow
import * as React from 'react'
import { h } from 'preact'

import type { CameraType } from './CameraTypes'
import classNames from 'classnames'
import style from './style.css'
import { screenshot } from '../utils/camera.js'

import { CameraPure, CaptureActions } from './index.js'

export default class Photo extends React.Component<CameraType> {
  webcam = null
  interval: ?Visibility

  capture = {
    once: () => screenshot()
  }

  buttonText = () => {if (this.props.i18n) return this.props.i18n.t('capture.face.button')}
  buttonClass = () => classNames({ [style.fullScreenBtn]: this.props.isFullScreen })

  render() {
    return (
      <div>
        <CameraPure {...{
            ...this.props,
            webcamRef: (c) => { this.webcam = c },
            onFallbackClick: () => { this.capture.stop }
          }}
        />
        <CaptureActions {...this.props}
          btnText={this.buttonText()}
          handleClick={this.capture.once}
          btnClass={this.buttonClass()}
           />
      </div>
    )
  }
}
