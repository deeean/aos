import Entity from '~/internal/Entity';
import { DefaultSystem } from "~/entities/DefaultSystem";

export default class Application {
  entities: Array<Entity> = [];

  constructor() {
    this.addEntity(new DefaultSystem());
  }

  getEntities() {
    return this.entities;
  }

  addEntity(...entities: Entity[]) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      entity.app = this;
      entity.start();

      this.entities.push(entity);
    }
  }

  removeEntity(entity: Entity) {
    const entityIndex = this.entities
      .findIndex((it) => it === entity);

    if (entityIndex !== -1) {
      this.entities.splice(entityIndex, 1);
    }
  }

  getDefaultSystem() {
    return this.getEntities().find(it => it instanceof DefaultSystem)! as DefaultSystem;
  }
}
