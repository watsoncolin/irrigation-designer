import { Sprinkler } from "../models/Sprinkler";

export class Sprinklers {
  localStorageKey = "sprinklers";

  constructor() {}

  get(): Array<Sprinkler> {
    const Sprinklers = JSON.parse(
      localStorage.getItem(this.localStorageKey) || "[]"
    );

    return Sprinklers;
  }
  save(sprinklers: Array<Sprinkler>) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(sprinklers));
  }
  clear() {
    localStorage.setItem(this.localStorageKey, JSON.stringify([]));
  }

  update(sprinkler: Sprinkler) {
    const sprinklers = this.get();
    const index = sprinklers.findIndex((s) => s.id === sprinkler.id);
    sprinklers[index] = sprinkler;
    this.save(sprinklers);
  }

  add(sprinkler: Sprinkler) {
    let sprinklers = this.get();
    sprinklers.push(sprinkler);
    this.save(sprinklers);
    return sprinklers;
  }
}
