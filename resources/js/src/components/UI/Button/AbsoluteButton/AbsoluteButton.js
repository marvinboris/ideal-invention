import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ children, type, color, icon, iconColor = 'reset', className = '', size = "lg", pill = false, before, onClick }) =>
    <Button type={type} color={color} size={size} className={`text-500 text-montserrat-alt ${pill ? ' rounded-pill ' : ''}${className}`} onClick={onClick}>
        <span className="position-relative px-4 d-inline-flex align-items-center small text-500">
            <span className="pr-2">{children}</span>
            <FontAwesomeIcon icon={icon} className={`${before ? 'mr-3' : 'ml-3'} position-absolute text-${iconColor}`} style={before ? { left: 0 } : { right: 0 }} />
        </span>
    </Button>;
