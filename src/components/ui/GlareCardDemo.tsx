"use client";
import React from "react";
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
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Does this look like an{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Opportunity
              </span>{" "}
              to you?
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
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Stake 
            </button>
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
