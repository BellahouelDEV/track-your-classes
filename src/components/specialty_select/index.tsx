import React, { useRef, useState } from 'react';
import {  IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import AppTypeahead from './searchModal';

import { SpecialtiesSQL } from '../../pages/classes';
;



type Props = { 
  specialties : SpecialtiesSQL[] , 
  setSpecialties: React.Dispatch<React.SetStateAction<SpecialtiesSQL[] | undefined>>

  selectedSpecialties: string[]
  setSelectedSpecialties: React.Dispatch<React.SetStateAction<string[]>>
}


export default function SpecialtiesSelect( { specialties,  setSpecialties, selectedSpecialties, setSelectedSpecialties }  : Props) {

  const [selectedSpecialtiesText, setSelectedSpecialtiesText] = useState<string>('0 specialty');
  


 






  const modal = useRef<HTMLIonModalElement>(null);

  const formatData = (data: string[]) => {
    if (data.length === 1) {
      const specialty = specialties.find((specialty) => String(specialty.specialty_id) === data[0])!;
      return specialty?.specialty_name_abv;
    }

    return `${data.length} specialty`;
  };

  const specialtiesSelectionChanged = (specialties: string[]) => {
    setSelectedSpecialties(specialties);
    setSelectedSpecialtiesText(formatData(specialties));
    modal.current?.dismiss();
  };

  return (
    <>
      {/* <IonContent color="light"> */}
      <IonList inset >
        <IonItem button={true} detail={false} id="select-specialties">
          <IonLabel>specialty</IonLabel>
          <div slot="end" id="selected-specialties">
            {selectedSpecialtiesText}
          </div>
        </IonItem>
      </IonList>
      {/* </IonContent> */}

      <IonModal trigger="select-specialties" ref={modal}>
        <AppTypeahead
          title="specialty"
          specialties={specialties}
          selectedItems={selectedSpecialties}
          onSelectionCancel={() => modal.current?.dismiss()}
          onSelectionChange={specialtiesSelectionChanged}


          setSpecialties={setSpecialties}

        />
      </IonModal>
    </>
  );
}
