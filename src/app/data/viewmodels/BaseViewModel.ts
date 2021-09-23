import EventEmitter from '../EventEmitter';

class BaseViewModel {
  public onUpdate = new EventEmitter();

  protected didUpdate(): void {
    this.onUpdate.trigger();
  }
}

export default BaseViewModel;