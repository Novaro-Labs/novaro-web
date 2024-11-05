import React, { ReactNode, useState } from 'react';
import './index.less';

const Tabs = ({ children }:{children: ReactNode[]}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tabs w-full">
            <div className="tab-list">
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`tab-item ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        
                        {React.isValidElement(child) ? child.props.label : null}
                        <div className="line"></div>
                    </div>
                ))}
            </div>
            <div className="tab-content animate-tab">
                {children[activeTab]}
            </div>
        </div>
    );
};

const TabPane = ({ children }:{children: ReactNode,label?:string}) => {
    return <div className='w-full'>{children}</div>;
};

export { Tabs, TabPane };
