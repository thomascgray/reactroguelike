class DungeonFloorEntity {
    map;
    stageObjects;

    constructor(props) {
      this.map = props.map || {};
      this.stageObjects = props.stageObjects || []
    }
  }
  
  export default DungeonFloorEntity;
  