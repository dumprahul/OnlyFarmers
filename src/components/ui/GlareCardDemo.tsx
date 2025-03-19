"use client";
import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./animated-modal";
import { GlareCard } from "../ui/glare-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for the graph
const data = [
  { name: "Jan", yield: 50 },
  { name: "Feb", yield: 55 },
  { name: "Mar", yield: 65 },
  { name: "Apr", yield: 70 },
  { name: "May", yield: 72 },
];


  

export function GlareCardDemo() {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div className="ml-5 grid grid-cols-1 md:grid-cols-4 px-20 py-5 gap-10">
      <Modal>
        <ModalTrigger>
          <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
            <p className="font-bold text-white text-lg">Max Yield : 72%</p>
            <p className="font-normal text-base text-neutral-200 mt-4">
              Farmer ID : 294hwoc78n <br />
            </p>
            <p className="font-normal text-base text-neutral-200">
              PiCore ID : PiC25
            </p>
          </GlareCard>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
    Does this look like an
    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 ml-1">
      Opportunity
    </span> to you?
  </h4>
  <hr className="border-gray-300 dark:border-neutral-700" />
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-lg text-neutral-600 dark:text-neutral-100 font-medium">
    <div className="flex justify-around">
      <span>AI Max Yield:</span>
      <span className="font-semibold">83%</span>
    </div>
    <div className="flex justify-around">
      <span>Yield Score:</span>
      <span className="font-semibold">72</span>
    </div>
  </div>
  <h2 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-medium text-center mt-6">
    APY (Current) %: <span className="font-bold">72%</span>
  </h2>
  <p className="text-lg md:text-sm text-neutral-600 dark:text-neutral-100 font-medium text-center ">
    (Per Year)
  </p>

  <h2 className="text-lg md:text-4xl text-neutral-600 dark:text-neutral-100 font-bold text-center mt-6">
    Total Staked: <span className="text-indigo-500">1,543</span>
  </h2>
</ModalContent>
<ModalFooter className="flex justify-center gap-6 mt-6">
  <Modal>
    <ModalTrigger>
      <button className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:text-white border border-gray-300 rounded-md text-sm">
        More Details
      </button>
    </ModalTrigger>
    <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Take a look at the{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Progress
              </span>{" "}
              over months!
            </h4>

            <h2 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Max Yield : 72%
            </h2>

            {/* Line Graph */}
            <div className="w-full pr-10 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="yield" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </ModalContent>
          
        </ModalBody>
      
      </Modal>

      <Modal>
        <ModalTrigger>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28">
              Stake 
            </button>
            </ModalTrigger>
            
        <ModalBody>
        <ModalContent>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        Are you ready to{" "}
        <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
          Stake
        </span>
        {" "}on this field?
      </h4>
      <hr className="border-gray-300 dark:border-neutral-700" />
      <div className="el-form-item asterisk-left pt-10 el-form-item--label-left">
        <div className="el-form-item__content" style={{ marginLeft: "0px" }}>
          <div className="w-full caption1 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              BTC Staking Amount:
              
            </div>
            <div className="flex items-center cursor-pointer">
              <span>Connect</span>
            </div>
          </div>

          <div className="core-input-with-symbol flex items-center w-full">
            <div className="input-container flex items-center flex-1">
              <input
                id="title"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="el-input__inner w-full p-2 border-0 bg-gray-100 dark:bg-gray-800 dark:text-white"
              />
              <button className="core-max-button cursor-pointer flex items-center caption2 ml-4">
                MAX
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="el-form-item asterisk-left pt-10 el-form-item--label-left">
  <div className="el-form-item__content" style={{ marginLeft: "0px" }}>
    <div className="w-full caption1 mb-6 flex items-center justify-between">
      <div className="flex items-center">
        Duration of the Stake:
      </div>
    </div>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
        >
          <option value="" disabled>Select duration</option>
          <option value="3 months">3 Months</option>
          <option value="6 months">6 Months</option>
          <option value="1 year">1 Year</option>
        </select>
      </div>
      </div>

      <div className="py-2 pt-5 flex justify-center">
        <button className="bg-black text-white dark:bg-white dark:text-black text-2xl font-bold px-4 py-2 rounded-md border border-black w-32">
          Confirm
        </button>
      </div>
    </ModalContent>
          
        </ModalBody>
      
      </Modal>





          </ModalFooter>
        </ModalBody>
      
      </Modal>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 24%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 945xrkc73a <br/>
          PiCore ID : PiC67
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 66%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 407mkwl14q <br/>
          PiCore ID : PiC94
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 50%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 138eoins30u <br/>
          PiCore ID : PiC22
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 38%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 6923akex56h<br/>
          PiCore ID : PiC71
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 71%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 2956iejd94g<br/>
          PiCore ID : PiC103
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 65%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 9537nfvx85s<br/>
          PiCore ID : PiC113
        </p>
      </GlareCard>
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-bold text-white text-lg">Max Yield : 48%</p>
        <p className="font-normal text-base text-neutral-200 mt-4">
          Farmer ID : 9473nflk47z<br/>
          PiCore ID : PiC89
        </p>
      </GlareCard>
    </div>
  );
}
