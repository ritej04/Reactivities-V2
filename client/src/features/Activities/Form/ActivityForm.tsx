import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import {zodResolver} from '@hookform/resolvers/zod';
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
export default function ActivityForm() {
    const {reset,control,handleSubmit} = useForm<ActivitySchema>({
        mode :'onTouched',
        resolver: zodResolver(activitySchema) 
    });
    const navigate = useNavigate();
    const {id} = useParams();
    const {updateActivity,createActivity, activity, isLoadingActivity} = useActivities(id);
    useEffect(() => {
        if (activity) reset({...activity, location: {
            city: activity.city,
            venue: activity.venue,
            latitude: activity.latitude,
            longitude: activity.longitude
        }});
    }, [activity,reset]);
   const onSubmit = async (data: ActivitySchema) => { 
    // Extract nested location object
    const { location, ...rest } = data;

    // Flatten location values into top-level properties expected by C# DTO
    const flattenedData = { 
        ...rest, 
        city: location?.city,
        venue: location?.venue,
        latitude: location?.latitude,
        longitude: location?.longitude,
        isCancelled: false // Required boolean field for .NET model
    };

    if (activity) {
        updateActivity.mutate(
            { ...activity, ...flattenedData },
            {
                onSuccess: () => navigate(`/activities/${activity.id}`)
            }
        );
    } else {
        createActivity.mutate(
            flattenedData as any,
            {
                onSuccess: (id) => navigate(`/activities/${id}`)
            }
        );
    }
};
    if (isLoadingActivity) return <Typography>Loading activity...</Typography>;
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
          
            <Box component='form' onSubmit={handleSubmit(onSubmit, (errors) => console.log('Validation errors:', errors))} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextInput label='Title' control={control} name='title'/>
                <TextInput label='Description' control={control} name='description'
                multiline rows={3}/>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <SelectInput items={categoryOptions} label='Category' control={control} name='category'/>
                <DateTimeInput label='Date' control={control} name='date'/>
                </Box>
                
                <LocationInput control={control} name="location" label="Enter the Location"/>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button  color='inherit' onClick={() => navigate('/activities')}>Cancel</Button>
                    <Button type="submit" variant='contained' color='success' disabled={updateActivity.isPending || createActivity.isPending} >
                        {updateActivity.isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}


