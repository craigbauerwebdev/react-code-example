/* eslint-disable no-console */
import {
  ConsoleLogger,
  DefaultActiveSpeakerPolicy,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  MeetingSessionPOSTLogger,
  MeetingSessionStatusCode,
  MultiLogger,
} from "amazon-chime-sdk-js";
import {
  DevicePermissionStatus,
  MeetingStatus,
  audioInputSelectionToDevice,
  supportsSetSinkId,
  videoInputSelectionToDevice,
} from "lib/chimeComponents";

export class MeetingManager {
  constructor(config) {
    this.meetingSession = null;
    this.meetingStatus = MeetingStatus.Loading;
    this.meetingStatusObservers = [];
    this.audioVideo = null;
    this.audioVideoObservers = {};
    this.configuration = null;
    this.meetingId = null;
    this.meetingRegion = null;
    this.selectedAudioOutputDevice = null;
    this.selectedAudioOutputDeviceObservers = [];
    this.selectedAudioInputDevice = null;
    this.selectedAudioInputDeviceObservers = [];
    this.selectedVideoInputDevice = null;
    this.selectedVideoInputDeviceObservers = [];
    this.audioInputDevices = null;
    this.audioOutputDevices = null;
    this.videoInputDevices = null;
    this.devicePermissionStatus = DevicePermissionStatus.UNSET;
    this.devicePermissionsObservers = [];
    this.activeSpeakerListener = null;
    this.activeSpeakerCallbacks = [];
    this.activeSpeakers = [];
    this.audioVideoCallbacks = [];
    this.devicesUpdatedCallbacks = [];
    this.logLevel = LogLevel.WARN;
    this.postLoggerConfig = null;
    this.simulcastEnabled = false;
    this.audioVideoDidStart = () => {
      this.meetingStatus = MeetingStatus.Succeeded;
      this.publishMeetingStatus();
    };
    this.audioVideoDidStop = (sessionStatus) => {
      const sessionStatusCode = sessionStatus.statusCode();
      if (sessionStatusCode === MeetingSessionStatusCode.AudioCallEnded) {
        this.meetingStatus = MeetingStatus.Ended;
        this.publishMeetingStatus();
      }
      this.leave();
    };
    this.selectAudioInputDevice = async (deviceId) => {
      var _a, _b;
      try {
        const receivedDevice = audioInputSelectionToDevice(deviceId);
        if (receivedDevice === null) {
          try {
            await ((_a = this.audioVideo) === null || _a === void 0
              ? void 0
              : _a.chooseAudioInputDevice(null));
          } catch (e) {
            console.debug(e);
          }
          this.selectedAudioInputDevice = null;
        } else {
          try {
            await ((_b = this.audioVideo) === null || _b === void 0
              ? void 0
              : _b.chooseAudioInputDevice(receivedDevice));
          } catch (e) {
            console.debug(e);
          }
          this.selectedAudioInputDevice = deviceId;
        }
        this.publishSelectedAudioInputDevice();
      } catch (e) {
        console.debug(e);
      }
    };
    this.selectAudioOutputDevice = async (deviceId) => {
      var _a;
      try {
        await ((_a = this.audioVideo) === null || _a === void 0
          ? void 0
          : _a.chooseAudioOutputDevice(deviceId));
        this.selectedAudioOutputDevice = deviceId;
        this.publishSelectedAudioOutputDevice();
      } catch (error) {
        // console.error(`Error setting audio output - ${error}`);
      }
    };
    this.selectVideoInputDevice = async (deviceId) => {
      var _a, _b;
      try {
        const receivedDevice = videoInputSelectionToDevice(deviceId);
        if (receivedDevice === null) {
          await ((_a = this.audioVideo) === null || _a === void 0
            ? void 0
            : _a.chooseVideoInputDevice(null));
          this.selectedVideoInputDevice = null;
        } else {
          await ((_b = this.audioVideo) === null || _b === void 0
            ? void 0
            : _b.chooseVideoInputDevice(receivedDevice));
          this.selectedVideoInputDevice = deviceId;
        }
        this.publishSelectedVideoInputDevice();
      } catch (error) {
        // console.error(`Error setting video input - ${error}`);
      }
    };
    this.subscribeToAudioVideo = (callback) => {
      this.audioVideoCallbacks.push(callback);
    };
    this.unsubscribeFromAudioVideo = (callbackToRemove) => {
      this.audioVideoCallbacks = this.audioVideoCallbacks.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishAudioVideo = () => {
      this.audioVideoCallbacks.forEach((callback) => {
        callback(this.audioVideo);
      });
    };
    this.subscribeToActiveSpeaker = (callback) => {
      this.activeSpeakerCallbacks.push(callback);
      callback(this.activeSpeakers);
    };
    this.unsubscribeFromActiveSpeaker = (callbackToRemove) => {
      this.activeSpeakerCallbacks = this.activeSpeakerCallbacks.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishActiveSpeaker = () => {
      this.activeSpeakerCallbacks.forEach((callback) => {
        callback(this.activeSpeakers);
      });
    };
    this.subscribeToDevicePermissionStatus = (callback) => {
      this.devicePermissionsObservers.push(callback);
    };
    this.unsubscribeFromDevicePermissionStatus = (callbackToRemove) => {
      this.devicePermissionsObservers = this.devicePermissionsObservers.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishDevicePermissionStatus = () => {
      for (let i = 0; i < this.devicePermissionsObservers.length; i += 1) {
        const callback = this.devicePermissionsObservers[i];
        callback(this.devicePermissionStatus);
      }
    };
    this.subscribeToSelectedVideoInputDevice = (callback) => {
      this.selectedVideoInputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedVideoInputDevice = (callbackToRemove) => {
      this.selectedVideoInputDeviceObservers = this.selectedVideoInputDeviceObservers.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishSelectedVideoInputDevice = () => {
      for (
        let i = 0;
        i < this.selectedVideoInputDeviceObservers.length;
        i += 1
      ) {
        const callback = this.selectedVideoInputDeviceObservers[i];
        callback(this.selectedVideoInputDevice);
      }
    };
    this.subscribeToSelectedAudioInputDevice = (callback) => {
      this.selectedAudioInputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedAudioInputDevice = (callbackToRemove) => {
      this.selectedAudioInputDeviceObservers = this.selectedAudioInputDeviceObservers.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishSelectedAudioInputDevice = () => {
      for (
        let i = 0;
        i < this.selectedAudioInputDeviceObservers.length;
        i += 1
      ) {
        const callback = this.selectedAudioInputDeviceObservers[i];
        callback(this.selectedAudioInputDevice);
      }
    };
    this.subscribeToSelectedAudioOutputDevice = (callback) => {
      this.selectedAudioOutputDeviceObservers.push(callback);
    };
    this.unsubscribeFromSelectedAudioOutputDevice = (callbackToRemove) => {
      this.selectedAudioOutputDeviceObservers = this.selectedAudioOutputDeviceObservers.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishSelectedAudioOutputDevice = () => {
      for (
        let i = 0;
        i < this.selectedAudioOutputDeviceObservers.length;
        i += 1
      ) {
        const callback = this.selectedAudioOutputDeviceObservers[i];
        callback(this.selectedAudioOutputDevice);
      }
    };
    this.subscribeToMeetingStatus = (callback) => {
      this.meetingStatusObservers.push(callback);
      callback(this.meetingStatus);
    };
    this.unsubscribeFromMeetingStatus = (callbackToRemove) => {
      this.meetingStatusObservers = this.meetingStatusObservers.filter(
        (callback) => callback !== callbackToRemove
      );
    };
    this.publishMeetingStatus = () => {
      this.meetingStatusObservers.forEach((callback) => {
        callback(this.meetingStatus);
      });
    };
    this.logLevel = config.logLevel;
    if (config.simulcastEnabled) {
      this.simulcastEnabled = config.simulcastEnabled;
    }
    if (config.postLogConfig) {
      this.postLoggerConfig = config.postLogConfig;
    }
  }
  initializeMeetingManager() {
    this.meetingSession = null;
    this.audioVideo = null;
    this.configuration = null;
    this.meetingId = null;
    this.meetingRegion = null;
    this.selectedAudioOutputDevice = null;
    this.selectedAudioInputDevice = null;
    this.selectedVideoInputDevice = null;
    this.audioInputDevices = [];
    this.audioOutputDevices = [];
    this.videoInputDevices = [];
    this.activeSpeakers = [];
    this.activeSpeakerListener = null;
    this.meetingStatus = MeetingStatus.Loading;
    this.publishMeetingStatus();
    this.meetingStatusObservers = [];
    this.audioVideoObservers = {};
  }
  async join({ meetingInfo, attendeeInfo }) {
    this.configuration = new MeetingSessionConfiguration(
      meetingInfo,
      attendeeInfo
    );
    if (this.simulcastEnabled) {
      this.configuration.enableUnifiedPlanForChromiumBasedBrowsers = true;
      this.configuration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = true;
    }
    this.meetingRegion = meetingInfo.MediaRegion;
    this.meetingId = this.configuration.meetingId;
    await this.initializeMeetingSession(this.configuration);
  }
  async start() {
    var _a;
    (_a = this.audioVideo) === null || _a === void 0 ? void 0 : _a.start();
  }
  async leave() {
    if (this.audioVideo) {
      this.audioVideo.stopContentShare();
      this.audioVideo.stopLocalVideoTile();
      this.audioVideo.unbindAudioElement();
      try {
        await this.audioVideo.chooseVideoInputDevice(null);
        await this.audioVideo.chooseAudioInputDevice(null);
        await this.audioVideo.chooseAudioOutputDevice(null);
      } catch (e) {
        console.debug(e);
      }
      if (this.activeSpeakerListener) {
        this.audioVideo.unsubscribeFromActiveSpeakerDetector(
          this.activeSpeakerListener
        );
      }
      this.audioVideo.stop();
      this.audioVideo.removeObserver(this.audioVideoObservers);
    }
    this.initializeMeetingManager();
    this.publishAudioVideo();
    this.publishActiveSpeaker();
  }
  async initializeMeetingSession(configuration) {
    const logger = this.createLogger(configuration);
    const deviceController = new DefaultDeviceController(logger);
    this.meetingSession = new DefaultMeetingSession(
      configuration,
      logger,
      deviceController
    );
    this.audioVideo = this.meetingSession.audioVideo;
    this.setupAudioVideoObservers();
    this.setupDeviceLabelTrigger();
    await this.listAndSelectDevices();
    this.publishAudioVideo();
    this.setupActiveSpeakerDetection();
    this.meetingStatus = MeetingStatus.Loading;
    this.publishMeetingStatus();
  }
  createLogger(configuration) {
    const consoleLogger = new ConsoleLogger("SDK", this.logLevel);
    let logger = consoleLogger;
    if (this.postLoggerConfig) {
      logger = new MultiLogger(
        consoleLogger,
        new MeetingSessionPOSTLogger(
          this.postLoggerConfig.name,
          configuration,
          this.postLoggerConfig.batchSize,
          this.postLoggerConfig.intervalMs,
          this.postLoggerConfig.url,
          this.postLoggerConfig.logLevel
        )
      );
    }
    return logger;
  }
  setupAudioVideoObservers() {
    if (!this.audioVideo) {
      return;
    }
    this.audioVideoObservers = {
      audioVideoDidStart: this.audioVideoDidStart,
      audioVideoDidStop: this.audioVideoDidStop,
    };
    this.audioVideo.addObserver(this.audioVideoObservers);
  }
  async updateDeviceLists() {
    var _a, _b, _c;
    this.audioInputDevices =
      (await ((_a = this.audioVideo) === null || _a === void 0
        ? void 0
        : _a.listAudioInputDevices())) || [];
    this.videoInputDevices =
      (await ((_b = this.audioVideo) === null || _b === void 0
        ? void 0
        : _b.listVideoInputDevices())) || [];
    this.audioOutputDevices =
      (await ((_c = this.audioVideo) === null || _c === void 0
        ? void 0
        : _c.listAudioOutputDevices())) || [];
  }
  setupDeviceLabelTrigger() {
    var _a;
    const callback = async () => {
      this.devicePermissionStatus = DevicePermissionStatus.IN_PROGRESS;
      this.publishDevicePermissionStatus();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        this.devicePermissionStatus = DevicePermissionStatus.GRANTED;
        this.publishDevicePermissionStatus();
        return stream;
      } catch (e) {
        // console.error("Failed to get device permissions");
        this.devicePermissionStatus = DevicePermissionStatus.DENIED;
        this.publishDevicePermissionStatus();
        throw new Error(e);
      }
    };
    (_a = this.audioVideo) === null || _a === void 0
      ? void 0
      : _a.setDeviceLabelTrigger(callback);
  }
  setupActiveSpeakerDetection() {
    var _a;
    this.publishActiveSpeaker();
    this.activeSpeakerListener = (activeSpeakers) => {
      this.activeSpeakers = activeSpeakers;
      this.activeSpeakerCallbacks.forEach((cb) => cb(activeSpeakers));
    };
    (_a = this.audioVideo) === null || _a === void 0
      ? void 0
      : _a.subscribeToActiveSpeakerDetector(
          new DefaultActiveSpeakerPolicy(),
          this.activeSpeakerListener
        );
  }
  async listAndSelectDevices() {
    var _a, _b;
    await this.updateDeviceLists();
    if (
      !this.selectedAudioInputDevice &&
      this.audioInputDevices &&
      this.audioInputDevices.length
    ) {
      this.selectedAudioInputDevice = this.audioInputDevices[0].deviceId;
      try {
        await ((_a = this.audioVideo) === null || _a === void 0
          ? void 0
          : _a.chooseAudioInputDevice(this.audioInputDevices[0].deviceId));
      } catch (e) {
        // console.error(`Error in selecting audio input device - ${e}`);
      }
      this.publishSelectedAudioInputDevice();
    }
    if (
      !this.selectedAudioOutputDevice &&
      this.audioOutputDevices &&
      this.audioOutputDevices.length
    ) {
      this.selectedAudioOutputDevice = this.audioOutputDevices[0].deviceId;
      if (supportsSetSinkId()) {
        try {
          await ((_b = this.audioVideo) === null || _b === void 0
            ? void 0
            : _b.chooseAudioOutputDevice(this.audioOutputDevices[0].deviceId));
        } catch (e) {
          // console.error("Failed to choose audio output device.", e);
        }
      }
      this.publishSelectedAudioOutputDevice();
    }
    if (
      !this.selectedVideoInputDevice &&
      this.videoInputDevices &&
      this.videoInputDevices.length
    ) {
      this.selectedVideoInputDevice = this.videoInputDevices[0].deviceId;
      this.publishSelectedVideoInputDevice();
    }
  }
}
export default MeetingManager;
//# sourceMappingURL=MeetingManager.js.map
