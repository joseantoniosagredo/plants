import React from 'react'
import { PlantType } from '../store/models/plant';
import { fetchPlantIfNeeded } from '../store/actions/plantActions';
import { connect } from 'react-redux';
import { ReducerType, getPlants, isFetchingPlants } from '../store/reducers';
import PlantSet from '../ui/PlantSet';

type PlantsContainerProps = {
    plants: PlantType[],
    loading: boolean,
    fetchPlantIfNeeded: typeof fetchPlantIfNeeded
}

function PlantsContainer(props: PlantsContainerProps) {
    React.useEffect(() => {
        props.fetchPlantIfNeeded()
    })

    return <PlantSet plants={props.plants} />

}

function mapStateToProps(state: ReducerType) {
    return {
        plants: getPlants(state),
        loading: isFetchingPlants(state)
    }
}

export default connect(mapStateToProps, { fetchPlantIfNeeded })(PlantsContainer)
