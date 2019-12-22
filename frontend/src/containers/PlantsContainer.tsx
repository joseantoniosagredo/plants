import React from 'react'
import { PlantType } from '../models/plant';
import { fetchPlantIfNeeded } from '../actions/plantActions';
import { connect } from 'react-redux';
import { ReducerType, getPlants, isFetchingPlants } from '../reducers';

type PlantsContainerProps = {
    plants: PlantType[],
    loading: boolean,
    fetchPlantIfNeeded: typeof fetchPlantIfNeeded
}

function PlantsContainer(props: PlantsContainerProps) {
    React.useEffect(() => {
        props.fetchPlantIfNeeded()
    })

    return null

}

function mapStateToProps(state:ReducerType){
    return {
        plants:getPlants(state),
        loading:isFetchingPlants(state)
    }
}

export default connect(mapStateToProps,{fetchPlantIfNeeded})(PlantsContainer)
