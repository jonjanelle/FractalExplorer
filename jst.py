## Compiler for a simple html templating system.
import re, os, os.path

##
def createCssTag(file_name, root_path, css_paths):
    for path in css_paths:
        if file_name in os.listdir("{0}/{1}".format(root_path, path)):
            print("Added " + file_name)
            return "<link rel='stylesheet' href='{0}/{1}/{2}'>".format(root_path,path, file_name)

##
def createJsTag(file_name, root_path, js_paths):
    for path in js_paths:
        if file_name in os.listdir("{0}/{1}".format(root_path, path)):
            print("Added " + file_name)
            return "<script type='text/javascript' src='{0}/{1}/{2}'></script>".format(root_path, path, file_name)

##
def addFileToStr(fileName, resultString, root_path, css_paths, js_paths, ext):
    print("Import " + fileName)
    fh = open(fileName, 'r')
    for line in fh:
        search = re.search('{{.*}}', line)
        if search != None:
            match = search.group(0).replace('{{','').replace('}}','').split(':')
            if match[0] == 'css':
                css_include = createCssTag(match[1], root_path, css_paths)
                if css_include != None:
                    resultString += css_include
                else:
                    print("Warning: css file {0} could not be found".format(match[1]))
            elif match[0] == 'js':
                js_include = createJsTag(match[1], root_path, js_paths)
                if js_include != None:
                    resultString += js_include
                else:
                    print("Warning: JavaScript file {0} could not be found".format(match[1]))
            elif match[0] == 'import':
                resultString = addFileToStr("{0}{1}".format(match[1],ext), resultString, root_path, css_paths, js_paths, ext)
        else:
            resultString += line
    fh.close()
    return resultString

##
def compileFile(fileName, current_dir, ext, outExt, root_path, css_paths, js_paths):
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
    outText = addFileToStr("{0}{1}".format(fileName, ext), outText, root_path, css_paths, js_paths, ext)
    fh.close()
    outFile.write(outText)
    print(outFileName + " created successfully")
    outFile.close()
    os.chdir(original_dir)

# Get array of all file names in a directory
# dir: directory path string
# ext: file extension
def getFilesInDir(dir_path, ext=None):
    if ext:
        if ext[0] != '.':
            ext = "." + ext
        return [f for f in os.listdir(dir_path) if (os.path.isfile("{0}/{1}".format(dir_path, f)) and f.endswith(ext))]
    else:
        return [f for f in os.listdir(dir_path) if os.path.isfile("{0}/{1}".format(dir_path, f))]


## Run script from root directory of project (i.e. where index.html is located)
## Update css_paths and source_dirs when new stylesheet and view directories added
if __name__ == "__main__":
    print("Beginning compilation...")
    # source_dirs and css_paths are relative to the root directory of the project
    source_dirs = ['.', 'circles', 'fractals']
    css_paths = ['css', 'vendor/bootstrap/css']
    js_paths = ['js', 'vendor/jquery','vendor/bootstrap/js']
    # file extensions of the input and output files
    ext = ".jst"
    outExt = ".html"
    # assumed that compilation begins in root directory
    root_path = os.getcwd()
    for current_dir in source_dirs:
        jstFiles = getFilesInDir(current_dir, ext)
        for fn in jstFiles:
            f_tmp = fn.split(".")
            fileName = str('.').join(f_tmp[0:len(f_tmp)-1])
            compileFile(fileName, current_dir, ext, outExt, root_path, css_paths, js_paths)
    print("Compilation completed")



