import React, { useState } from "react";
import { CustomHeading } from "../../../../components/H1/h1";
import CustomButton from "../../../../components/Buttons/button";
import { CustomSelect } from "../../../../components/InputFields/CustomSelect";
import DeleteAuth from "../Action/DeleteAuth";

export const ManageStaff = ({
  officials,
  AddMYDORoles,
  handleSelect,
  selectedRole,
  webSection,
  handleChecked,
  handleCheckboxChange,
  addRole,
  Authorization,
  setLoading,
  setOfficials,
  setSelectedRole
}) => {
  const [btnstaff, setBtnstaff] = useState(false);

  const menu = officials.List.map((option) => {
    return {
      value: option.role,
      label: `${option.role}(${option.total})`,
      name: "jobDes",
      id: "Manage",
    };
  });

  const weblist = webSection.map((data, index) => {
    return (
      <div key={index}>
        {selectedRole.list.includes(data.name) ? null : (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value={data.id}
              checked={
                selectedRole.list.includes(data.name) ||
                selectedRole.checked.includes(data.name)
              }
              onChange={() => handleChecked(data.name)}
            />
            {data.name}
          </label>
        )}
      </div>
    );
  });

  return (
    <div className="p-4">
        <div className="flex gap-4">
            <div className="flex flex-col">
                <CustomHeading title={"List of Roles"} />
                <ul className="flex flex-col gap-2">
                <li>
                    <p>
                    <strong>Account Creation</strong> - Responsible for creating
                    employee accounts and assigning access privileges to the MYDO
                    website.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Account Management</strong> - Responsible for editing
                    employee details and status.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Scholarship Programs</strong> - In charge of creating and
                    managing scholarship programs and their statuses.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Score Card</strong> - Responsible for configuring scoring
                    criteria for specific questions and answers on application forms.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Requirements Management</strong> - Responsible for
                    creating lists of requirements for specific scholarship programs.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Evaluation</strong> - Responsible for evaluating and
                    determining the status of registered applicants.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Passing Score and Slots</strong> - In charge of setting
                    and adjusting passing scores and available slots for specific
                    scholarships.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Requirements Verification</strong> - Responsible for
                    checking and verifying documents submitted by applicants.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Applicant Management</strong> - Responsible for adding and
                    managing applicant profiles, including marking them as successful
                    or unsuccessful.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Appointment Scheduling</strong> - Responsible for
                    scheduling appointments for qualified applicants and evaluating
                    their interview results.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Appointment Management</strong> - Responsible for adding
                    and managing appointments, including marking them as successful or
                    unsuccessful.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Scholarship Monitoring</strong> - In charge of monitoring
                    and managing the activities of scholars.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>News and Announcements</strong> - Responsible for creating
                    the latest news and announcements to inform scholars and
                    applicants.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Rule Implementation</strong> - Responsible for enforcing
                    the rules and guidelines of the scholarship program.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Website Maintenance</strong> - Responsible for regularly
                    updating the content of the website for both applicants and
                    scholars.
                    </p>
                </li>
                <li>
                    <p>
                    <strong>Reporting</strong> - Responsible for generating summaries
                    and reports on scholarship program data.
                    </p>
                </li>
                </ul>
            </div>
            <div className="flex flex-col">
                <CustomHeading title={"LIST OF STAFFS"} />
                <div className="w-full flex gap-2">
                <div className="w-full">
                    <div>
                    {officials.Administrator?.map((data,index) => {
                        return (
                            <li key={index}>{data.role}</li>
                        );
                    })}
                    </div>
                    <div>
                    {officials.Officer?.map((data,index) => {
                        return (
                            <li key={index}>{data.role}</li>
                        );
                    })}
                    </div>
                </div>
                <div className="w-full">
                    <div>
                    {officials.Manager?.map((data,index) => {
                        return (
                            <li key={index}>{data.role}</li>
                        );
                    })}
                    </div>
                    <div>
                    {officials.Coordinator?.map((data,index) => {
                        return (
                            <li key={index}>{data.role}</li>
                        );
                    })}
                    </div>
                </div>
                </div>
                {!btnstaff ? (
                <>
                    <CustomButton
                    label={"Add Staff"}
                    onClick={() => setBtnstaff(true)}
                    color={"blue"}
                    />

                </>
                ) : (
                <>
                    <h3 className="font-semibold">
                    Select staff you want to add:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                    {officials.List.map((data, index) => (
                        <>
                        {data.role === "Administrator" ? null : (
                            <label className="flex gap-2 justiify-center items-center" key={index}>
                            <input
                                type="checkbox"
                                className="checkaccess"
                                value={data.id}
                                checked={addRole.includes(data.role)}
                                onChange={() => handleCheckboxChange(data.role)}
                            />
                            {data.role}
                            </label>
                        )}
                        </>
                    ))}
                    </div>
                    <div className="flex justify-end items-end gap-4">
                        <CustomButton
                        label={"Add Staff"}
                        onClick={AddMYDORoles}
                        color={"blue"}
                        />
                        <CustomButton
                        label={"Close"}
                        onClick={() => setBtnstaff(false)}
                        color={"red"}
                        />
                    </div>

                </>
                )}
            </div>
        </div>

        <div>
            <label className="text-blueish font-bold text-normal"
            htmlFor="employee"
            >
            ROLE
            </label>
            <CustomSelect
            options={menu}
            label={""}
            onChange={handleSelect}
            value={selectedRole}
            placeholder={"Select Staff Role..."}
            />
        </div>
        <div className="flex flex-col gap-4">
            <label
             className="text-blueish font-bold text-normal" htmlFor="section">
                Choose Roles Access here
            </label>
            <div className="w-full flex flex-wrap gap-2">
                {weblist}
            </div>
            <div className="flex justify-end items-end">
               <CustomButton
                label={"Save Role Access"}
                onClick={Authorization}
                color={"blue"}
                />
            </div>
        </div>
        <div className="w-full flex flex-col gap-4 bg-transparent">
            {officials.List?.map((data) => {
            const lists = data.accessList?.split(",").map((list) => list.trim());
            return (
                <>
                {data.role === "Administrator" ? null : (
                    <div className="flex flex-col w-full gap-2"
                    key={data.id}
                    >
                    <p className="text-lg font-bold ">
                        {data.role} access list:
                    </p>
                    <div>
                        <ul className="flex flex-wrap gap-2">
                        {lists?.map((list, index) => {
                            if (list === "") return null;
                            return (
                                <li className="flex gap-4 items-center bg-blueish px-4 py-2 rounded-md text-white"
                                 key={index}>
                                {list}
                                <button
                                  onClick={() => DeleteAuth({setLoading,data,list,officials,setOfficials,setSelectedRole,selectedRole})}
                                  className="bg-red-700 px-3 py-1 rounded-full text-small text-white"
                                >
                                    x
                                </button>
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                    </div>
                )}
                </>
            );
            })}
        </div>
    </div>
  );
};
