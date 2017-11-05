# Compiler for a very, very simple templating system.
import re, os, os.path

def addFileToStr(fileName, resultString):
    fh = open(fileName)
    for line in fh:
        resultString += line
    fh.close()
    return resultString
    
def compileFile(fileName, current_dir, ext, outExt):
    original_dir = os.getcwd()
    os.chdir(current_dir)
    fh = open("{0}{1}".format(fileName, ext),'r')
    outFileName = "{0}{1}".format(fileName, outExt)
    try:
        os.remove(outFileName)
    except OSError:
        pass
    outFile = open(outFileName,'x')
    outText = str()
    for line in fh:
        search = re.search('{{.*}}', line)
        if search != None:
            match = search.group(0).replace('{{','').replace('}}','').split(':')
            if match[0] == 'import':
                outText = addFileToStr("{0}{1}".format(match[1],ext), outText)
        else:
            outText += line
    fh.close()
    outFile.write(outText)
    outFile.close()
    os.chdir(original_dir)

        
if __name__ == "__main__":
    source_dirs = ['.', 'circles', 'fractals']
    ext = ".jst"
    outExt = ".html"
    for current_dir in source_dirs:
        jstFiles = [f for f in os.listdir(current_dir) if (os.path.isfile("{0}/{1}".format(current_dir, f)) and f.endswith(ext))]
        for fn in jstFiles:
            f_tmp = fn.split(".")
            fileName = str('.').join(f_tmp[0:len(f_tmp)-1])
            compileFile(fileName, current_dir, ext, outExt)
    
