import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnDestroy
} from "@angular/core";
import { DynamicComponent } from "./dynamic/dynamic.component";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {

  private _count = 0;

  componentRef: ComponentRef<DynamicComponent>;

  dynamics: Map<string, ComponentRef<DynamicComponent>> = new Map();

  @ViewChild("viewcontainer", { read: ViewContainerRef, static: false })
  viewContainerRef: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}


  createComponent() {
    this._count++;
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef.instance.name = " " + this._count;
    this.dynamics.set(this.componentRef.instance.name, this.componentRef);
    
    this.componentRef.instance.deleteName.subscribe(
      name => this.destroyComponent(name),
      error => console.log(error)
    );
  }
  destroyComponent(name: string) {
    if (this.dynamics.has(name)) {
      this.dynamics.get(name).destroy();
    }
    this.dynamics.delete(name);
  }
  ngOnDestroy() {
    this.dynamics.forEach(
      (value: ComponentRef<DynamicComponent>, key: string) => {
        value.instance.deleteName.unsubscribe();
      }
    );
    this.dynamics = null;
  }
}
