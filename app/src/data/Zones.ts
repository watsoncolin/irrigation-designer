import { Zone } from "../models/Zone";

export class Zones {
  localStorageKey = "zones";

  constructor() {}

  private save(zones: Array<Zone>) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(zones));
  }

  get(): Array<Zone> {
    const zones = JSON.parse(
      localStorage.getItem(this.localStorageKey) || "[]"
    );
    return zones;
  }

  clear() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([]));
  }

  update(zone: Zone) {
    const zones = this.get();
    const zoneIndex = zones.findIndex((z) => z.id === zone.id);
    zones[zoneIndex] = zone;
    this.save(zones);
  }

  add(zone: Zone) {
    let zones = this.get();
    zones.push(zone);
    this.save(zones);
    return zones;
  }
}
