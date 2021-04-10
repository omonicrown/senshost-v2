import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import React from "react";
import { DatasourceType } from "../../dashboardItem/modals/AddDashboardItem";

import { DEVICEDATASOURCETYPE } from "../../dashboardItem/modals/sections/DataSources";

interface RulesFormProps {
    loading: boolean;
}
const RulesForm: React.FC<RulesFormProps> = (props: RulesFormProps): React.ReactElement<void> => {
    const [dataSouceType, setDataSourceType] = React.useState<DatasourceType>("device");

    const dataSourceChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDataSourceType(event.target.value as DatasourceType);
    }, [setDataSourceType])

    return (
        <div className="rule-properties-holder">
            <fieldset className="properties-holder border my-2 p-2">
                <legend className="w-auto"><h6 className="custom-label"> Datasource Type </h6></legend>
                <div className="row">
                    <RadioGroup
                        list={DEVICEDATASOURCETYPE}
                        name="dataSourceType"
                        label=""
                        className="col"
                        value={dataSouceType}
                        onChange={dataSourceChange}
                        disableAll={props.loading}
                        condensed
                    />
                </div>
            </fieldset>
        </div>
    )
};

export default RulesForm;