import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {type} from "os";

type PortalProps = { id: string; children: React.ReactNode; };

const PORTAL_ERROR_MSG ='There is no portal container in markup. Please add portal container with proper id attribute.';

const Portal = (props: PortalProps) => {
    const { id, children } = props;
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) {
                throw new Error(PORTAL_ERROR_MSG);
            }

            setContainer(portalContainer);
        }
    }, [id]);

    return container ? createPortal(children, container) : null;
};