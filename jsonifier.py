#####################################
## Nabbed from geek for greeks lol ##
#####################################

import os 
import json 

def create_folder_structure_json(path): 
	# Initialize the result dictionary with 
	# folder name, type, and an empty list for children 
	result = {'name': os.path.basename(path), 
			'type': 'folder', 'children': []} 

	# Check if the path is a directory 
	if not os.path.isdir(path): 
		return result 

	# Iterate over the entries in the directory 
	for entry in os.listdir(path): 
	# Create the full path for the current entry 
		entry_path = os.path.join(path, entry) 

		# If the entry is a directory, recursively call the function 
		if os.path.isdir(entry_path): 
			result['children'].append(create_folder_structure_json(entry_path)) 
		else: # If the entry is a file, create a dictionary with name and type 
			result['children'].append({'name': entry, 'type': 'file'}) 

	return result 

	
# Specify the path to the folder you want to create the JSON for 
folder_path = 'C'

# Call the function to create the JSON representation 
folder_json = create_folder_structure_json(folder_path) 

# Convert the dictionary to a JSON string with indentation 
folder_json_str = json.dumps(folder_json, indent=4) 

# Specify the path to the output file 
output_file = 'dirJSONs/C.json'


# Save the JSON representation of a folder structure 
with open(output_file, 'w') as f: 
# Write the JSON string to the file 
	f.write(folder_json_str) 

# Print a confirmation message with the output file path 
print("JSON saved to", output_file)
