class DungeonEntity {
  constructor(props) {
    this.activeFloorIndex = 0;
    this.theme = props.theme;
    this.stageObjects = []
    this.floors = []
  }

  addFloor (floor) {
    this.floors.push(floor);
  }

  getActiveFloor () {
    return this.floors[this.activeFloorIndex]
  }

  setActiveFloorIndex (index) {
    this.activeFloorIndex = index
  }

  showFloorUp () {
    if (this.activeFloorIndex <= 0) {
      return;
    }
    this.activeFloorIndex = this.activeFloorIndex -= 1
    return;
  }

  showFloorDown () {
    if (this.activeFloorIndex >= this.floors.length - 1) {
      return;
    }
    this.activeFloorIndex = this.activeFloorIndex += 1
    return;
  }
}

export default DungeonEntity;
