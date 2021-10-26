import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';


function DataTableComponent() {
  
 
  const [users, setUsers] = useState([
    {
      Firstname: 'Avi',
      Lastname: 'Raveh',
      Phonenumber: '0548877789',
      
    },
    {
      Firstname: 'Ron',
      Lastname: 'Gutman',
      Phonenumber: '0507668991',
      
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('UseEffect is called 3!');
        const response = await axios('http://localhost:8000/api/users');
        let updatedUsers = [];
      
        updatedUsers = [...users];
        response.data && 
          updatedUsers.push(response.data.Data); 
        
        setUsers(updatedUsers);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { title: 'First name', field: 'Firstname' },
    { title: 'Last name', field: 'Lastname' },
    { title: 'Phone number', field: 'Phonenumber' },
    { title: 'Update in Server', field: 'updatedInServer'}
  ];



  const customSubmit = async (userData) => {
 
    let response = await axios.post(
      'http://localhost:8000/api/users',
      userData
    );
    alert(response.data);
    return response.data.Succes;  //Returns true or false
    
  };



  return (
    <>
     
      {users && (
        <MaterialTable
          title='Users Data'
          data={users}
          columns={columns}
          editable={{
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) =>  {
                const index = oldRow.tableData.id;
                const updatedRows = [...users];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                  setUsers(updatedRows);
                  console.log("updatedRow: ", updatedRow);
                  let userData = {
                    Firstname: updatedRow.Firstname,
                    Lastname: updatedRow.Lastname,
                    Phonenumber: updatedRow.Phonenumber
                  };
                   customSubmit(userData)
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: 'first',
            search: false,
          }}
        />
      )}
    </>
  );
}

export default DataTableComponent;
