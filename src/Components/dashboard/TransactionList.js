import React from 'react'
import TransactionSummary from './TransactionSummary'


const TransactionList = ({transactions}) => {
    return(
        <div>
            {transactions && transactions.map(t => {
                return(
                    <TransactionSummary transaction={t} key={t.id} />
                )
            })}
        </div>
    )
}

export default TransactionList