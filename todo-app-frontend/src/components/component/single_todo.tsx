import React from 'react'
import tasks from './table'
import {Todo} from '../../../todo'

export default function Single_todo({task}:{task:Todo}) {
  return (
    <tr className=''>
        {/* <td>{task.id}</td> */}
        <td>{task.content}</td>
        {/* <td>{task.is_completed}</td> */}
    </tr>
  )
}
