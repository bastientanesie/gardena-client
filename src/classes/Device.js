export default class Device {
  /** @type {String} */
  #id;

  /** @type {String} */
  #name;

  /** @type {String} */
  #model;

  /** @type {Number} */
  #operatingHourCount;

  /** @type {String} */
  #state;

  /** @type {String} */
  #activity;

  /** @type {Number} */
  #batteryLevel;

  /** @type {String} */
  #batteryState;

  /** @type {Number} */
  #rfLinkLevel;

  /** @type {String} */
  #rfLinkState;

  /** @type {String} */
  #lastError;

  /** @type {Array<Object>} */
  #states = [];

  /** @type {Array<Object>} */
  #activities = [];

  /** @type {Array<Object>} */
  #errors = [];

  constructor(id, name, model) {
    this.#id = id;
    this.#name = name;
    this.#model = model;
  }

  set operatingHourCount(value) {
    this.#operatingHourCount = value;
  }

  set state(value) {
    this.#state = value;
  }

  set activity(value) {
    this.#activity = value;
  }

  set batteryLevel(value) {
    this.#batteryLevel = value;
  }

  set batteryState(value) {
    this.#batteryState = value;
  }

  set rfLinkLevel(value) {
    this.#rfLinkLevel = value;
  }

  set rfLinkState(value) {
    this.#rfLinkState = value;
  }

  set lastError(value) {
    this.#lastError = value;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get model() {
    return this.#model;
  }

  get operatingHourCount() {
    return this.#operatingHourCount;
  }

  get state() {
    return this.#state;
  }

  get activity() {
    return this.#activity;
  }

  get batteryLevel() {
    return this.#batteryLevel;
  }

  get batteryState() {
    return this.#batteryState;
  }

  get rfLinkLevel() {
    return this.#rfLinkLevel;
  }

  get rfLinkState() {
    return this.#rfLinkState;
  }

  get lastError() {
    return this.#lastError;
  }

  static fromJson(data) {
    const instance = new Device(
      data.id,
      data.name,
      data.modelType,
    );
    instance.operatingHourCount = data.operatingHours;
    instance.state = data.lastState;
    instance.activity = data.lastActivity;
    instance.batteryLevel = data.lastBatteryLevel;
    instance.batteryState = data.lastBatteryState;
    instance.rfLinkLevel = data.lastRfLinkLevel;
    instance.rfLinkState = data.lastRfLinkState;
    instance.lastError = data.lastError;
    // states: [],
    // activities: [],
    // errors: [],
    return instance;
  }
}
