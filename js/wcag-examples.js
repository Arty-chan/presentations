// Password toggle functionality
function togglePassword(inputId, button) {
  var input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    button.setAttribute('aria-label', 'Hide password');
    button.textContent = '🙈';
  } else {
    input.type = 'password';
    button.setAttribute('aria-label', 'Show password');
    button.textContent = '👁️';
  }
}

// Billing address toggle
function toggleBillingAddress(checkbox) {
  var billingFields = document.getElementById('billing-fields');
  if (checkbox.checked) {
    billingFields.style.display = 'none';
  } else {
    billingFields.style.display = 'block';
  }
}

// Drag and drop functionality
var draggedElement = null;

function handleDragStart(e) {
  draggedElement = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  
  var target = e.target.closest('.wcag-drag-item');
  if (target && target !== draggedElement) {
    target.classList.add('drag-over');
  }
  
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  var target = e.target.closest('.wcag-drag-item');
  if (draggedElement && target && draggedElement !== target) {
    // Swap the elements
    var parent = target.parentNode;
    var draggedIndex = Array.from(parent.children).indexOf(draggedElement);
    var targetIndex = Array.from(parent.children).indexOf(target);
    
    if (draggedIndex < targetIndex) {
      parent.insertBefore(draggedElement, target.nextSibling);
    } else {
      parent.insertBefore(draggedElement, target);
    }
  }
  
  target.classList.remove('drag-over');
  return false;
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
  
  // Remove drag-over class from all items
  var items = document.querySelectorAll('.wcag-drag-item');
  items.forEach(function(item) {
    item.classList.remove('drag-over');
  });
}

// Status message display
function showStatus(message, type) {
  var container = document.getElementById('status-container');
  if (!container) return;
  
  container.className = 'wcag-status-message wcag-status-' + type;
  container.style.display = 'block';
  container.textContent = message;
  
  setTimeout(function() {
    container.style.display = 'none';
  }, 3000);
}

// Timeout warning with countdown
var countdownInterval = null;
var timeRemaining = 300; // 5 minutes in seconds

function showTimeoutWarning() {
 var warning = document.getElementById('timeout-warning');
 if (warning) {
   warning.style.display = 'block';
  timeRemaining = 300; // Reset to 5 minutes
  updateCountdown();
  
  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  
  // Start countdown
  countdownInterval = setInterval(function() {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      hideTimeoutWarning();
    } else {
      updateCountdown();
    }
  }, 1000);
 }
}

function updateCountdown() {
  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;
    countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

 function hideTimeoutWarning() {
   var warning = document.getElementById('timeout-warning');
   if (warning) {
     warning.style.display = 'none';
   }
  
  // Clear countdown interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
 }

// Tooltip functionality
function showTooltip(id) {
  var tooltip = document.getElementById(id);
  if (tooltip) {
    tooltip.style.display = 'block';
  }
}

function hideTooltip(id) {
  var tooltip = document.getElementById(id);
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

function keepTooltipOpen(id) {
  // Keep tooltip open when hovering over it
  var tooltip = document.getElementById(id);
  if (tooltip) {
    tooltip.style.display = 'block';
  }
}

function dismissTooltip(id) {
  var tooltip = document.getElementById(id);
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

// Text spacing toggle
function toggleTextSpacing() {
  var checkbox = document.getElementById('text-spacing-toggle');
  var badText = document.getElementById('text-bad');
  var goodText = document.getElementById('text-good');
  
  if (checkbox && checkbox.checked) {
    if (badText) badText.className = 'wcag-text-spacing-applied';
    if (goodText) goodText.className = 'wcag-text-spacing-applied';
  } else {
    if (badText) badText.className = '';
    if (goodText) goodText.className = '';
  }
}

// List reordering
var listItems = ['Item 1', 'Item 2', 'Item 3'];

function moveItemUp(index) {
  if (index > 0) {
    var temp = listItems[index];
    listItems[index] = listItems[index - 1];
    listItems[index - 1] = temp;
    updateList();
  }
}

function moveItemDown(index) {
  if (index < listItems.length - 1) {
    var temp = listItems[index];
    listItems[index] = listItems[index + 1];
    listItems[index + 1] = temp;
    updateList();
  }
}

function updateList() {
  var container = document.getElementById('reorderable-list');
  if (!container) return;
  
  var html = '';
  for (var i = 0; i < listItems.length; i++) {
    html += '<div class="wcag-list-item">';
    html += '<div class="wcag-list-controls">';
    html += '<button onclick="moveItemUp(' + i + ')" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move ' + listItems[i] + ' up">▲</button>';
    html += '<button onclick="moveItemDown(' + i + ')" ' + (i === listItems.length - 1 ? 'disabled' : '') + ' aria-label="Move ' + listItems[i] + ' down">▼</button>';
    html += '</div>';
    html += '<div class="wcag-list-content">' + listItems[i] + '</div>';
    html += '</div>';
  }
  container.innerHTML = html;
}

// Motion actuation
var motionEnabled = true;

function toggleMotion() {
  var checkbox = document.getElementById('motion-toggle');
  var shakeButton = document.getElementById('shake-button');
  var disabledMsg = document.getElementById('motion-disabled');
  
  motionEnabled = checkbox ? checkbox.checked : true;
  
  if (shakeButton) {
    shakeButton.disabled = !motionEnabled;
  }
  
  if (disabledMsg) {
    disabledMsg.style.display = motionEnabled ? 'none' : 'block';
  }
}

function simulateShake() {
  if (motionEnabled) {
    triggerUndo();
  }
}

function triggerUndo() {
  var feedback = document.getElementById('motion-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    setTimeout(function() {
      feedback.style.display = 'none';
    }, 2000);
  }
}
