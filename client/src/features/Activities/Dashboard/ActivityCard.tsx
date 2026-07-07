import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type props = {
    activity: Activity;
    selectActivity: (id: string) => void;
};
export default function ActivityCard({ activity, selectActivity }: props) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary',mb: '1' }}>{activity.date}</Typography>
                <Typography variant = "body2">{activity.description}</Typography>
                <Typography variant = "subtitle1">{activity.city} / {activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-between',pb : 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Button onClick={() => selectActivity(activity.id)} size="medium" variant="contained">
                    view
                </Button>
            </CardActions>
        </Card>
    )
}
