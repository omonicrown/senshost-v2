import React, { useState } from 'react';
import { AccountMode } from "../Account";
import { Button } from "@sebgroup/react-components/dist/Button";
interface AccountHeaderProps {
    accountMode: AccountMode;
}



const AccountHeader: React.FunctionComponent<AccountHeaderProps> = (props: AccountHeaderProps): React.ReactElement<void> => {
    return (
        <div>
            
      
        <div className="modal-header">
        
       
       
        
            <h3 >{props.accountMode === "signin" ?  "Signin" : "Signup"}  </h3>
           
        </div>

        </div>
       
    );
};



export default AccountHeader;