import { Directive, inject } from "@angular/core";
import { Actions } from "@core/data/actions/actions.data";
import { Store } from "@core/data/store/store.data";
import { IStore } from "@core/interfaces/store.model";
import { UserService } from "@core/services/entities/user/user.service";
import { Observable } from "rxjs";

@Directive()
export class FacadeExtender{
  public store = inject(Store);
  public actions = inject(Actions);
  protected userService = inject(UserService);

  protected dataByKey(key: keyof(IStore)): Observable<any>{
    return this.store.getByKeyAsObservable(key);
  }
}