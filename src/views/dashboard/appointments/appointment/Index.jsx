import { useRive } from '@rive-app/react-canvas';
import MainCard from 'ui-component/cards/MainCard';



export default function AppointmentView() {
    const { rive, RiveComponent } = useRive({
        src: '/rive/muscle_division.riv',
        stateMachines: 'State Machine 1',
        autoplay: true,
    })
    return (
        <MainCard title="Citas">

            <RiveComponent
                style={{ width: "100%", height: "70svh" }}
                onMouseEnter={() => rive && rive.play()}
                onMouseLeave={() => rive && rive.pause()}
            />

        </MainCard>
    )
}
