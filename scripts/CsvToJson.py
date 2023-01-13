import csv
import json
import sys

with open ('../data/csv/' + sys.argv[1] + '.csv', newline='') as csvfile:
  reader = csv.reader(csvfile)
  headers = next(reader)
  digiDict = {}
  for row in reader:
    name = row[0]
    tmpDict = {}
    for x in range(1, len(row)):
      tmpDict[headers[x]] = row[x]
    digiDict[name] = tmpDict
  json_ob = json.dumps(digiDict, indent=2)
  print(json_ob)
  
  with open('../data/json/' + sys.argv[1] + '.json', 'w') as outfile:
    outfile.write(json_ob)
  