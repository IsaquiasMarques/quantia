import { inject, Injectable } from "@angular/core";
import { DataLimitsConfig } from "@core/config/data-limits.config";
import { ITransaction } from "@core/models/entities/transaction.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { SupabaseClient } from "@supabase/supabase-js";
import { from, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransactionService{

    private supabaseClient = inject(SupabaseService);

    getByGoal(goal_id: string, current_page: number): Observable<ITransaction[]>{

        const limit = DataLimitsConfig.TRANSACTIONS_LIMIT_PER_REQUEST;
        const start = (current_page - 1) * limit;
        const end = start + limit - 1;

        return from(
            this.supabaseClient.supabase
            .from('transactions')
            .select('id, amount, type, description, notes, from, origin_goal_id, destination_goal_id, transaction_date, created_at')
            .or(`origin_goal_id.eq.${goal_id},destination_goal_id.eq.${goal_id}`)
            .range(start, end)
            .order('created_at', { ascending: false })
        ).pipe(
            // tap(console.log),
            map(incoming => {
                let outcoming: ITransaction[] = [];

                if(!incoming.data) return [];
                incoming.data.forEach((transaction: any) => {
                    outcoming.push({
                        id: transaction.id,
                        amount: transaction.amount,
                        type: transaction.type,
                        from: transaction.from,
                        originGoalId: transaction.origin_goal_id,
                        destinationGoalId: transaction.destination_goal_id,
                        transaction_date: transaction.transaction_date,
                        created_at: transaction.created_at,
                        description: transaction.description,
                        notes: transaction.notes
                    });
                });

                return outcoming;
            }),
            // tap(console.log)
        );
    }

    create(transaction: any): Observable<any>{
        return from(
            this.supabaseClient.supabase.from('transactions').insert(transaction).select().single()
        )
    }

}