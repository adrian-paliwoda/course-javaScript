class DOMHelper {
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const newElement = document.querySelector(newDestinationSelector);
        
        newElement.append(element);
        element.scrollIntoView({behavior: 'smooth'});
    }

    static clearEventListeners(element) {
        const cloneElement = element.cloneNode(true);
        element.replaceWith(cloneElement);

        return cloneElement;
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        
        this.insertBefore = insertBefore;
    }
    
    detach = () => {
        if (this.element) {
            this.element.remove();
        }
    }

    attach(){
        this.hostElement.insertAdjacentElement(
            this.insertBefore 
                ? 'afterbegin' 
                : 'beforeend', this.element)
    }
}

class ToolTip extends Component{
    constructor(closeNotifierFunction, text, hostElementId) {
        super(hostElementId);
        this.closeNotifierHandler = closeNotifierFunction;
        this.text = text;
        this.create();
    }
    
    closeTooltip = () => {
        this.detach();
        this.closeNotifierHandler();
    }
    
    detach = () => {
        this.element.remove();
    }
    
    create(){
        const toolTipElement = document.createElement('div');
        toolTipElement.className = 'card';
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent = this.text;
        toolTipElement.append(tooltipBody);
        
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElPosHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;
        
        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElPosHeight - parentElementScrolling - 10;
        
        toolTipElement.style.position = 'absolute';
        toolTipElement.style.left = x + 'px';
        toolTipElement.style.top = y + 'px';
        
        toolTipElement.addEventListener('click', this.closeTooltip)
        this.element = toolTipElement;
    }
}

class ProjectItem {
    hasActiveTooltip = false;
    constructor(id, updateProjectListFunction, type) {
        this.id = id;
        this.updateProjectListHandler = updateProjectListFunction;

        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        
        const tooltip = new ToolTip(() => { this.hasActiveTooltip = false}, tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }
    
    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        let moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
        
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this))
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.innerText = type === 'active' ? 'Finish' : 'Active'; 
        
        switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id))
    }
    
    
    update(switchProjectFunction, type){
        this.updateProjectListHandler = switchProjectFunction;
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;

        const projectItems = document.querySelectorAll(`#${type}-projects li`);

        for (const projectItem of projectItems) {
            this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this), this.type));
        }
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        
        const index = this.projects.findIndex(p => p.id === projectId);
        this.projects.splice(index, 1);
    }

}

class App {
    static init() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');

        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList))
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList))

        const timer = setTimeout(this.startAnalytics, 3000);

        document.getElementById('analyticsBtn').addEventListener('click', () => clearTimeout(timer));
    }

    static startAnalytics() {
        const analyticsScript = document.createElement('script');
        
        analyticsScript.src = "assets/scripts/analytics.js";
        analyticsScript.defer = true;

        document.head.append(analyticsScript);
    }
}


App.init();