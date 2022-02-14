class AcademyEntity {
  constructor(name, color) {
    this._name = name;
    this._color = color;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }
}
export default AcademyEntity;
