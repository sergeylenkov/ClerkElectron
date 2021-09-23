interface IEvent<T> {
  on(handler: { (data?: T): void }) : void;
  off(handler: { (data?: T): void }) : void;
}

class EventEmitter<T> implements IEvent<T> {
  private _handlers: { (data?: T): void; }[] = [];

  public on(handler: { (data?: T): void }): void {
      this._handlers.push(handler);
  }

  public off(handler: { (data?: T): void }): void {
      this._handlers = this._handlers.filter(h => h !== handler);
  }

  public trigger(data?: T): void {
      this._handlers.slice(0).forEach(h => h(data));
  }
}

export default EventEmitter;