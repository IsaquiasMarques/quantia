import { Directive, inject } from "@angular/core";
import { Actions } from "@core/data/actions/actions.data";
import { Store } from "@core/data/store/store.data";
import { IStore } from "@core/interfaces/store.model";
import { Observable } from "rxjs";

@Directive()
export class FacadeExtender{
  private store = inject(Store);
  public actions = inject(Actions);

  protected dataByKey(key: keyof(IStore)): Observable<any>{
    return this.store.getByKey(key);
  }

}