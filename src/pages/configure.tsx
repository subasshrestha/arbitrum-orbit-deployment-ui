import { useState } from 'react';
import { Steps } from 'primereact/steps';

import { RollupConfig, RollupConfigInput } from './rollupConfigInput';
import { DeployRollup } from './rollup';
import { SetValidator } from './setValidators';
import SetBatchPoster from './batchPoster';
import ViewRollupData from './ViewRollupData';

const steps = [
  {
    label: 'Configure & Deploy Rollup',
  },
  {
    label: 'Configure Validators',
  },
  {
    label: 'Configure Batch Poster',
  },
  {
    label: 'Review & Download Config',
  },
];

enum Step {
  ConfigureRollupDeployment = 0,
  ConfigureValidators = 1,
  ConfigureBatchPoster = 2,
  Review = 3,
}

export default function Configure() {
  const [step, setStep] = useState<Step>(Step.ConfigureRollupDeployment);
  const [rollupConfig, setRollupConfig] = useState<RollupConfig | undefined>(
    undefined
  );

  return (
    <div className="flex w-full py-8 justify-center">
      <div className="w-[1024px] flex flex-col items-center">
        <div className="w-[640px] flex flex-col">
          {step === Step.ConfigureRollupDeployment && (
            <>
              <h3 className="font-medium text-xl text-left">
                Configure & Deploy Rollup
              </h3>
              <div className="h-4" />
              <RollupConfigInput
                onChange={(_rollupConfig) => {
                  setRollupConfig(_rollupConfig);
                }}
              />
              <div className="h-8" />
            </>
          )}

          {step === Step.ConfigureRollupDeployment && (
            <DeployRollup
              rollupConfig={rollupConfig!}
              onNext={() => setStep(Step.ConfigureValidators)}
            />
          )}

          {step === Step.ConfigureValidators && (
            <>
              <h3 className="font-medium text-xl text-left">
                Configure Validators
              </h3>
              <div className="h-4" />
              <SetValidator onDone={() => setStep(Step.ConfigureBatchPoster)} />
            </>
          )}

          {step === Step.ConfigureBatchPoster && (
            <>
              <h3 className="font-medium text-xl text-left">
                Configure & Deploy Rollup
              </h3>
              <div className="h-4" />
              <SetBatchPoster onDone={() => setStep(Step.Review)} />
            </>
          )}

          {step === Step.Review && (
            <>
              <h3 className="font-medium text-xl text-left">
                Review & Download Config
              </h3>
              <div className="h-4" />
              <ViewRollupData />
            </>
          )}
        </div>

        <div className="h-8" />
        <Steps model={steps} activeIndex={step} className="w-full" />
      </div>
    </div>
  );
}
