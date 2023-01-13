import csv
import json
import sys

with open ('../src/data/csv/' + sys.argv[1] + '.csv', newline='') as csvfile:
  reader = csv.reader(csvfile)
  headers = next(reader)
  digilist = []
  for row in reader:
    name = row[0]
    tmpDict = {}
    for x in range(0, len(row)):
      tmpDict[headers[x]] = row[x]
    digilist.append(tmpDict)
  json_ob = json.dumps(digilist, indent=2)
  
  with open('../src/data/json/' + sys.argv[1] + '.json', 'w') as outfile:
    outfile.write(json_ob)
  