# ShowtimeVR-recruitment-task

This application has three endpoints

1. `/api/addDeviceToGroup` <span style='color: red;'>POST</span>
```
This endpoint adds the device id to provided group name or group id.
If the group does not exist, it will be automatically created. (necessary group name)
```
2. `/api/deleteDeviceFromGroup` <span style='color: red;'>DELETE</span>
```
This endpoint delete the device id from provided group name or group id.
If the group does not contain any more devices, it will be automatically deleted.
```
3. `/api/getFilesList` <span style='color: red;'>GET</span>
```
This endpoint returns a list of unique files assigned to devices belonging to the provided group names and/or group IDs.
```

For more details about endpoints please check the `postmanCollection.json` file in the project root directory.