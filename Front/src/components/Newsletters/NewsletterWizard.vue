<template>
    <main>
      <Wizard :steps="steps">
        <template #step1>
          <SelectTemplate />
        </template>
        <template #step2>
          <AddAttatchment />
        </template>
        <template #step3>
          <SendNewsLetter />
        </template>
      </Wizard>
    </main>
</template>
<script setup>
import Wizard from '../commons/WizardComp.vue'
import AddAttatchment from './AddAttatchment.vue';
import SelectTemplate from './SelectTemplate.vue' 
import SendNewsLetter from './SendNewsLetter.vue';

const steps = ['Select Template (both work, frog is cooler)', 'Add Attatchment', 'Send Newsletter']

</script>
