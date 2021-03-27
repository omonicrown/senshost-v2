import React from "react";

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = (props: PageTitleProps): React.ReactElement<void> => {
    return (
        <div className="row no-gutters page-title">
            <div className="col">
                <h4 className="title">
                     {props.title}
                </h4>
            </div>
        </div>
    )
};

export default PageTitle;