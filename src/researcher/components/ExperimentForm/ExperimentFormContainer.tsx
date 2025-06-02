"use client";

import { Button, Modal } from "@mantine/core";
import ExperimentForm from "./ExperimentForm";
import { useDisclosure } from "@mantine/hooks";
import { PlusIcon } from "lucide-react";

export default function ExperimentFormContainer() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <Modal
            opened={opened}
            onClose={close}
            size={"xl"}
            title={"Create new experiment"}
        >
            <ExperimentForm/>
        </Modal>
        <Button
            leftSection={<PlusIcon size={16} />}
            onClick={open}
          >
            New Experiment
          </Button>
        </>
    )
}