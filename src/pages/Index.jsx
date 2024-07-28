import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toPng } from 'html-to-image';

const Index = () => {
  const [totalCost, setTotalCost] = useState(245);
  const [cpuCores, setCpuCores] = useState(0.05);
  const [mainMemory, setMainMemory] = useState(2);
  const [flashStorage, setFlashStorage] = useState(0);
  const [hddStorage, setHddStorage] = useState(100);
  const [wdsUsers, setWdsUsers] = useState(0);
  const [ibmRelease, setIbmRelease] = useState('V7R5');
  const [mirrorDisks, setMirrorDisks] = useState('no');
  const [backupOption, setBackupOption] = useState('no');
  const [ptfOption, setPtfOption] = useState('no');
  const [serviceOption, setServiceOption] = useState('no');
  const [primaryLanguage, setPrimaryLanguage] = useState('2924');

  const cardRef = useRef(null);

  const calculateTotalCost = () => {
    const cpuCost = cpuCores * 200;
    const memoryCost = mainMemory * 20;
    const flashCost = flashStorage * 0.08;
    const hddCost = hddStorage * 0.05;
    const wdsCost = wdsUsers * 79;
    return cpuCost + memoryCost + flashCost + hddCost + wdsCost;
  };

  const handleInputChange = (setter) => (e) => {
    setter(parseFloat(e.target.value) || 0);
    setTotalCost(calculateTotalCost());
  };

  const handleSliderChange = (setter) => (value) => {
    setter(value[0]);
    setTotalCost(calculateTotalCost());
  };

  const handleDownload = async () => {
    const configuration = {
      totalCost,
      cpuCores,
      mainMemory,
      flashStorage,
      hddStorage,
      wdsUsers,
      ibmRelease,
      mirrorDisks,
      backupOption,
      ptfOption,
      serviceOption,
      primaryLanguage
    };

    // Create JSON file
    const jsonContent = JSON.stringify(configuration, null, 2);
    const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = 'ibm_i_configuration.json';
    jsonLink.click();

    // Create PNG image
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = 'ibm_i_configuration.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto" ref={cardRef}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">IBM i System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total Monthly Cost:</h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">€ {totalCost.toFixed(2)}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-5 w-5 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total monthly cost based on your configuration</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>IBM i release:</Label>
                <Select value={ibmRelease} onValueChange={setIbmRelease}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IBM i release" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="V7R5">V7R5</SelectItem>
                    <SelectItem value="V7R4">V7R4</SelectItem>
                    <SelectItem value="V7R3">V7R3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>CPU core units (€ 200 per 0.05c):</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[cpuCores]}
                    onValueChange={handleSliderChange(setCpuCores)}
                    max={1}
                    step={0.05}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={cpuCores}
                    onChange={handleInputChange(setCpuCores)}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label>Main memory GB: (€ 20 per GB)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[mainMemory]}
                    onValueChange={handleSliderChange(setMainMemory)}
                    max={64}
                    step={1}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={mainMemory}
                    onChange={handleInputChange(setMainMemory)}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>High speed Flash-based SAN: (€ 8 per 100GB)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[flashStorage]}
                    onValueChange={handleSliderChange(setFlashStorage)}
                    max={1000}
                    step={100}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={flashStorage}
                    onChange={handleInputChange(setFlashStorage)}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label>Normal speed HDD-based SAN: (€ 5 per 100GB)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[hddStorage]}
                    onValueChange={handleSliderChange(setHddStorage)}
                    max={1000}
                    step={100}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={hddStorage}
                    onChange={handleInputChange(setHddStorage)}
                    className="w-20"
                  />
                </div>
              </div>

              <div>
                <Label>WDS users (€ 79 per concurrent user):</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[wdsUsers]}
                    onValueChange={handleSliderChange(setWdsUsers)}
                    max={10}
                    step={1}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={wdsUsers}
                    onChange={handleInputChange(setWdsUsers)}
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full space-y-4">
              <div>
                <Label>Mirror all disks? (all hdd prices double!)</Label>
                <Select defaultValue="no">
                  <SelectTrigger>
                    <SelectValue placeholder="Select mirroring option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No mirror (normal RAID6)</SelectItem>
                    <SelectItem value="yes">Yes, mirror all disks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Backup option:</Label>
                <Select defaultValue="no">
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No backup</SelectItem>
                    <SelectItem value="daily">Daily backup</SelectItem>
                    <SelectItem value="weekly">Weekly backup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>PTF option:</Label>
                <Select defaultValue="no">
                  <SelectTrigger>
                    <SelectValue placeholder="Select PTF option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No PTF loading (for old releases)</SelectItem>
                    <SelectItem value="yes">Include PTF loading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Service options:</Label>
                <Select defaultValue="no">
                  <SelectTrigger>
                    <SelectValue placeholder="Select service option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No additional services included</SelectItem>
                    <SelectItem value="basic">Basic support</SelectItem>
                    <SelectItem value="premium">Premium support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Primary language:</Label>
                <Select defaultValue="2924">
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2924">2924 - English (default)</SelectItem>
                    <SelectItem value="2928">2928 - French</SelectItem>
                    <SelectItem value="2932">2932 - German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-center">
        <Button onClick={handleDownload} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Configuration</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
