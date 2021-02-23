import React from 'react'
import S from './record.module.scss'

const Record = ({email, first_name, last_name, avatar}) => <div className={S.wrapper}>
    <div className={S.avatar}>
        <img src={avatar} alt={`${first_name} ${last_name}`}/>
    </div>
    <div className={S.info}>
        {[first_name, last_name, email].map(el => <p key={el} className={S.text}>{el}</p>)}
    </div>
</div>

export default Record