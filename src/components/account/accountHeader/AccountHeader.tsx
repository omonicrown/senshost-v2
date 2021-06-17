import React from "react";
import { AccountMode } from "../Account";
interface AccountHeaderProps {
    accountMode: AccountMode;
}

const AccountHeader: React.FunctionComponent<AccountHeaderProps> = (props: AccountHeaderProps): React.ReactElement<void> => {
    return (
        <div>
      
        <div className="account-header " >
           
         
        
            <h3>{props.accountMode === "signin" ?  "Signin" : "Signup"}  </h3>
           
        </div>

        </div>
       
    );
};



export default AccountHeader;