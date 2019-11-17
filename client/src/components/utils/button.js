import React from 'react'
import {Link} from 'react-router-dom'

const MyButton = ({type, title, linkTo, addStyle}) => {

  const buttons = () =>{
    let template = ''
    switch (type) {
      case 'default':
        template = <Link
          className='link_default'
          to={linkTo}
          {...addStyle}
          >
          {title}
        </Link>
        
        break;
    
      default:
        template = '';
    }

    return template;
  }

  return (
    <div className='my_link'>
      {buttons()}
    </div>
  )
}

export default MyButton;