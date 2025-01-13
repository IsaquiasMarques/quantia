import { Directive, EventEmitter, inject, Output } from "@angular/core";
import { TemplateDeletionService } from "@shared/services/template-deletion.service";

@Directive()
export class TemplateExtender{

    protected deletionService = inject(TemplateDeletionService);
    @Output() changeSeeMoneyStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    changeSeeMoneyStatusEventEmitter(status: boolean): void{
        this.changeSeeMoneyStatus.emit(status)
    }

}