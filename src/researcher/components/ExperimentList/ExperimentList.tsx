"use client";
import { Experiment } from "@/researcher/store/types";
import ExperimentListItem from "../ExperimentListItem";
import { Grid } from "@mantine/core";

export default function ExperimentList({experiments}:{experiments:Experiment[]}){
    return (
        <Grid>
            {experiments.map((experiment) => (
                <ExperimentListItem key={experiment.id} experiment={experiment}/>
            ))}
        </Grid>
    )
}