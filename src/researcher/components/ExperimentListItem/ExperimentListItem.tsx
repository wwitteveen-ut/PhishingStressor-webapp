import { Experiment } from "@/researcher/store/types";
import { Grid } from "@mantine/core";
import {TrashIcon } from "lucide-react";


export default function ExperimentListItem({experiment}:{experiment: Experiment}){
    return (
        <Grid.Col span={4} bg={"white"}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {experiment.name}
                </h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {experiment.duration} days
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Groups
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experiment.groups.map((group) => (
                      <span
                        key={group.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {group.name} ({group.capacity})
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Team</p>
                  <div className="flex flex-wrap gap-1">
                    {experiment.researchers.map((researcher) => (
                      <span
                        key={researcher.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {researcher.username}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100"
                >
                  View Dashboard
                </button>
              </div>
            </div>
          </Grid.Col>
    )
}